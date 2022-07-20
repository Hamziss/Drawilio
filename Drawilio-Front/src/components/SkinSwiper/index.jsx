import { EffectCoverflow, Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.min.css";

const sql = require("../../Assets/images/sql.png").default;
const green = require("../../Assets/images/green.png").default;
const blonde = require("../../Assets/images/blonde.png").default;
const haj = require("../../Assets/images/haj.png").default;
const assassin = require("../../Assets/images/assassin.png").default;
const bg = require("../../Assets/images/bg.png").default;
const bluegirl = require("../../Assets/images/bluegirl.png").default;
const fee = require("../../Assets/images/fee.png").default;
const snk = require("../../Assets/images/snk.png").default;
export const SwiperSkin = (props) => {
  function swiperhandler(swiper) {
    props.setSkin(swiper.activeIndex);
  }
  return (
    <>
      <Swiper
        onSlideChange={swiperhandler}
        effect={"coverflow"}
        grabCursor={true}
        initialSlide={3}
        centeredSlides={true}
        slidesPerView={"2"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
      >
        <SwiperSlide>
          <img src={sql} alt="sql skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={green} alt="green skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={blonde} alt="blonde skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img id="haj" src={haj} alt="haj skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assassin} alt="assassin skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bg} alt="bg skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "53%" }} src={bluegirl} alt="bluegirl skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{ width: "71%" }} src={fee} alt="fee skin" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={snk} alt="snk skin" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
