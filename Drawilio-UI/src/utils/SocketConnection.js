import { io } from 'socket.io-client';

const IO = (playerName, picture, roomId, action) => {
    return io(process.env.REACT_APP_API_URL, {
        path: '/socket.io',
        query: {
            username: playerName,
            picture: picture,
            roomId: roomId,
            action: action
        }
    });
}
export default IO;