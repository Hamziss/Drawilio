//TODO: add max_round as a choice to client
//TODO: add point gain for the drawer 
//TODO: add language to chooose the words file
//TODO: sorting the client game over list 
//TODO: change timer to global var
const words = require('../data/words.json');
const redis = require("redis");

const redisClient = redis.createClient({
    url: process.env.REDIS_ENDPOINT_URI,
    password: process.env.REDIS_PASSWORD
});

redisClient.on("error", function (error) {
    consola.error("Redis client connection failure " + error);
});
//global vars
const MAX_ROUNDS_PER_MATCH = 10
const ROUND_TIME = 90000
let nextTimerIndex = 0
let timerMap = {}
var timerId 
var gain

exports.Room = class {
    constructor(options) {
        this.io = options.io;
        this.socket = options.socket;
        this.username = options.username;
        this.picture = options.picture;
        this.roomId = options.roomId;
        this.action = options.action;
        this.timer = 90;
    }

    /**
    ** Main Game Loop called each round
    */
    gameLoop = ({ game_state }) => {

        redisClient.get(game_state.room_id, async (err, reply) => {
            if (err) {
                consola.error(`err fetching ${game_state.room_id} values ${err}`);
                return;
            }

            const updatedRoomState = JSON.parse(reply);
            let { game_state: updatedGameState, clients: updatedRoomClients, timeout_id } = updatedRoomState;

            consola.success('Rounds -> ', updatedGameState.round_no, "  ", updatedGameState.max_rounds);

            // check if players are still in the room
            const arePlayersStillInRoom = updatedRoomClients.length > 0;
            consola.info(`Number of players in room ${updatedRoomClients.length}`)

            //reset timer each round
            this.timer = 90
            var Timer = setInterval(() => {
                // emit timer 
                this.io.in(`${game_state.room_id}`).emit('timer', this.timer);

                this.timer--;
                gain = this.timer

                if (this.timer === 0) {
                    this.timer = 90
                    clearInterval(Timer)
                }

            }, 1000);
            timerId = Timer

            // Set has_guessed_word to false for all clients for fresh round
            updatedRoomClients.forEach((client) => {
                client.has_guessed_word = false;
            });

            // CHECK if game is over or not 
            if ((updatedGameState.round_no >= updatedGameState.max_rounds) || !arePlayersStillInRoom) {
                clearTimeout(timerMap[timeout_id])
                consola.success('Clearing timeout ', timeout_id)
                this.io.in(`${game_state.room_id}`).emit('game-over', { clients: updatedRoomClients, cur_word: updatedGameState.current_word })

                redisClient.del(`${game_state.room_id}`)
            } else {
                redisClient.set(this.roomId, JSON.stringify(updatedRoomState), async (err, reply) => {
                    if (err) {
                        consola.error(`Error in setting value in redis! ${err}`)
                        return;
                    }
                    if (updatedGameState.round_no > 0)
                        this.io.in(`${game_state.room_id}`).emit('round-over', { clients: updatedRoomClients, cur_word: updatedGameState.current_word, cur_round: updatedGameState.round_no })
                    updatedGameState.all_guessed = false;
                    // Wait for 3 seconds before starting a round
                    await new Promise(resolve => setTimeout(resolve, 3000))
                    this.broadcastAllConnectedClients(updatedRoomState);
                    this.shiftTurns(updatedRoomState)
                    let timeoutId = setTimeout(this.gameLoop, ROUND_TIME, updatedRoomState)
                    timerMap[nextTimerIndex] = timeoutId;
                    updatedGameState.timeout_id = nextTimerIndex
                    nextTimerIndex++;
                    redisClient.set(this.roomId, JSON.stringify(updatedRoomState), (err, reply) => {
                        if (err) {
                            consola.error(`Error in setting value in redis ${err}`)
                            return;
                        }
                    });
                });
            }
        })
    }


    /**
     ** Starts the game if there are more than 2 players connected   
     */
    startGame = () => {

        redisClient.get(this.roomId, (err, reply) => {
            if (err) {
                consola.error(`err fetching ${this.roomId} values ${err}`);
                return;
            }
            let roomState = JSON.parse(reply);
            this.broadcastRoomId(this.roomId);
            if (roomState) {
                var { clients, game_state } = roomState;

                if (clients.length > 1 && game_state.game_started === false) {
                    consola.success(`Starting game ${this.roomId} more than 1 client connected`)
                    let timeoutId = setTimeout(this.gameLoop, 1000, roomState);
                    timerMap[nextTimerIndex] = timeoutId;
                    game_state.timeout_id = nextTimerIndex;
                    nextTimerIndex++;
                    redisClient.set(this.roomId, JSON.stringify(roomState), (err, reply) => {
                        if (err) {
                            consola.error(`Error in setting key in redis! ${err}`)
                            return;
                        }

                    });
                } else {
                    consola.info('Not enough players');
                }


            }
        });
    }

    /**
     ** Emit room id to all clients in this room
     */
    broadcastRoomId = (roomId) => {
        this.io.in(roomId).emit('room-id', { id: roomId });
    };

    /**
    ** Listen to canvas erase event and emit to all clients  
    */
    listenToErase = () => {
        this.socket.on('erase', () => {
            this.socket.to(this.roomId).emit('erase');
        });
    }

    /**
    **  Shift turns evenly between players
    */
    shiftTurns = (roomState) => {
        let { clients, game_state: gameState } = roomState;
        let { consumed_words: consumedWords } = gameState;
        // Select player with minimum last_play_time
        if (!clients || clients.length === 0) {
            return;
        }
        let selectedPlayer = clients.reduce(function (prev, curr) {
            return prev.last_play_time < curr.last_play_time ? prev : curr;
        });
        const wordListFromDb = words['words']
        // Now get words selected previous in this game
        // And select a word which has not been selected previously
        const unconsumedWords = wordListFromDb.filter(word => !consumedWords.includes(word))
        // Pick a random word
        const selectedWord = unconsumedWords[Math.floor(Math.random() * unconsumedWords.length)];
        consola.info('Selected word ', selectedWord)
        consumedWords.push(selectedWord)
        gameState.round_no = Number(gameState.round_no) + 1;
        gameState.game_started = true;
        gameState.current_word = selectedWord;
        gameState.current_player = selectedPlayer.socket_id;
        // Set last_play_time to current time
        clients.forEach((client) => {
            if (client.socket_id === selectedPlayer.socket_id) {
                client.last_play_time = Date.now();
                return;
            }
        });
        // Now update to redis and emit required events
        redisClient.set(gameState.room_id, JSON.stringify(roomState), (err, reply) => {
            if (err) {
                consola.error(`Error redis set ${err}`);
                return;
            }
            this.io.to(gameState.room_id).emit('clear-board-and-current-word');
            this.io.to(gameState.room_id).emit('current-turn', { username: selectedPlayer.username });
            // replace every alphabet in the string with underscore for players which are not drawing & emit this word
            this.io.to(gameState.room_id).emit('hidden-word', { word: selectedWord.replace(/[a-z]/g, '_') });
            this.io.to(selectedPlayer.socket_id).emit('new-word', { word: selectedWord, to_socket_id: selectedPlayer.socket_id });
            this.io.in(gameState.room_id).emit('system-message', { username: "system", msg: `${selectedPlayer.username} is drawing` });
        });
    }

    /**
     ** Init steps on first connection 
     */
    init = async () => {
        if (this.action === 'join') {
            await this.socket.join(this.roomId);

            redisClient.get(this.roomId, (err, reply) => {
                if (err) {
                    consola.error(`Error in GET for ${this.roomId}`)
                }
                if (reply) {

                    let roomState = JSON.parse(reply);
                    // Default data for each client
                    roomState.clients.push({
                        socket_id: this.socket.id,
                        username: this.username,
                        picture: this.picture,
                        score: 0,
                        last_play_time: 0,
                        has_guessed_word: false
                    })
                    redisClient.set(this.roomId, JSON.stringify(roomState), (err, reply) => {
                        if (err) {
                            consola.error(err);
                            return false;
                        }
                        this.broadcastAllConnectedClients(roomState);
                        consola.info(`Joined room ${this.roomId} . REPLY ${reply}`);
                        this.startGame();
                    });
                }
            });
        }

        if (this.action === 'create') {

            await this.socket.join(String(this.roomId));
            const roomState = {
                game_state: {
                    room_id: this.roomId,
                    round_no: 0,
                    max_rounds: MAX_ROUNDS_PER_MATCH,
                    consumed_words: [],
                    all_guessed: false,
                    game_started: false,
                    current_word: '',
                    current_player: '',
                    timeout_id: undefined
                },
                clients: [{
                    socket_id: this.socket.id,
                    username: this.username,
                    picture: this.picture,
                    score: 0,
                    last_play_time: 0,
                    has_guessed_word: false
                }]
            }
            redisClient.SETNX(this.roomId, JSON.stringify(roomState), (err, reply) => {
                if (err) {
                    consola.error(`Error redis SETNEX ${err}`);
                    return;
                }
                consola.info(`REPLY from SETNX ${reply}`);
                this.broadcastAllConnectedClients(roomState);
            });
            this.socket.username = this.username;
            this.broadcastRoomId(this.roomId);
            consola.info(`[CREATE] Client created and joined room ${this.roomId}`);
        }
    }

    /**
    ** Listen to draw coordinates and broadcast them 
    */
    listenCords = () => {
        this.socket.on('cords', (data) => {
            this.socket.broadcast.to(this.roomId).emit('cords', { x: data.x, y: data.y, prevX: data.prevX, prevY: data.prevY });
        });
    }

    /**
     ** Listen to messages and broadcast 
     */
    listenToMessages = () => {
        this.socket.on('new_message', (data) => {

            redisClient.get(this.roomId, (err, reply) => {
                if (err) {
                    consola.error(`Error fetching room data ${this.roomId}`)
                }
                if (reply) {
                    let { msg: guessedWord } = data;
                    guessedWord = guessedWord.toLowerCase();
                    let roomState = JSON.parse(reply);
                    let { game_state, clients } = roomState;
                    let { room_id, timeout_id } = game_state;
                    let { current_word, current_player } = game_state;
                    // The player drawing should not be allowed to send messages!
                    if (this.socket.id === current_player) {
                        consola.info(`player drawing is trying to send a message`)
                        return;
                    }
                    // if this player has already guessed then the player should not be allowed to send messages
                    let curClientIndex = clients.findIndex(client => client.socket_id === this.socket.id)
                    if (clients[curClientIndex]?.has_guessed_word) {
                        consola.info(`Player has already guessed`)
                        return;
                    }
                    // If the guess is correct do not emit the message
                    // Instead emit `Player X has guessed the word`
                    if (current_word === guessedWord && current_word !== undefined) {
                        let currentClientIndex = clients.findIndex(client => client.socket_id === this.socket.id)
                        // if this user has guessed word in this round do not emit message
                        if (clients[currentClientIndex]?.has_guessed_word) {
                            return;
                        }
                        console.log(gain)
                        clients[currentClientIndex].score = Number(clients[currentClientIndex].score) + (gain * 10)
                        clients[currentClientIndex].has_guessed_word = true;
                        this.io.in(this.roomId).emit('correct-answer', { username: this.username, msg: "guessed the word" })

                        let haveAllPlayersGuessed = true;
                        clients.forEach(client => {
                            // Now check if all players have guessed except player drawing
                            // if yes then clear the timeout
                            if (client.has_guessed_word === false && client.socket_id !== current_player) {
                                haveAllPlayersGuessed = false;
                                return false;
                            }
                        });
                        redisClient.set(room_id, JSON.stringify(roomState), (err, reply) => {
                            if (err) {
                                consola.error(`Error setting key in redis!`);
                                return;
                            }
                            // If all players have guessed end the round by clearing the timeout
                            if (haveAllPlayersGuessed) {
                                roomState.game_state.all_guessed = true;
                                console.log("set all guessed to true");
                                this.startNextRound(timeout_id, roomState);
                            }
                            consola.info(`Have all players guessed `, haveAllPlayersGuessed)

                        });
                    } else {
                        // Incorrect guess 
                        this.io.in(this.roomId).emit('new_message', { username: this.username, msg: guessedWord, ownedby: this.socket.id })
                    }
                }
            });
        });
    }

    /**
    ** Remove socket on disconnect
    */
    onDisconnect = () => {
        this.socket.on('disconnect', () => {
            redisClient.get(this.roomId, (err, reply) => {
                if (err) {
                    consola.error(`Some error fetching ${this.roomId} from redis ${err}`)
                }
                if (reply) {
                    let roomData = JSON.parse(reply);
                    let { clients } = roomData;

                    let remainingClients = clients.filter(socket => socket.socket_id != this.socket.id);

                    roomData.clients = remainingClients;
                    redisClient.set(this.roomId, JSON.stringify(roomData), (err, reply) => {
                        if (err) {
                            consola.err(`Error setting key val ${err}`);
                            return;
                        }
                        consola.success(`Removed client from redis ${this.socket.id}`)
                    })
                    if (clients < 0) { redisClient.del(`${this.roomId}`), () => console.log("deleted with success") }

                }
            });
        });
    }

    /**
    ** Start the next round:
    **/
    startNextRound(timeout_id, roomState) {
        clearTimeout(timerMap[timeout_id])
        clearInterval(timerId)
        this.broadcastAllConnectedClients(roomState);
        setTimeout(this.gameLoop, 1000, roomState)
    }

    /**
    ** Broadcast all connected clients 
    */
    broadcastAllConnectedClients = (roomState) => {
        this.io.in(roomState.game_state.room_id).emit('client-list', { clients: roomState.clients });
    };
};