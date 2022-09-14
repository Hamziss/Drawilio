import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import { EffectCoverflow, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js"
import "swiper/swiper.min.css"
import { skinsArray } from "../../utils/skinsArray"

import classes from "./style.module.css"

export const SwiperSkin = ({ setSkin }) => {
	function swiperhandler(swiper) {
		setSkin(swiper.activeIndex)
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
				{skinsArray.map((skin, index) => {
					return (
						<SwiperSlide key={index} className={classes.swiperslide}>
							<LazyLoadImage effect="blur" src={skin} alt="skin" />
						</SwiperSlide>
					)
				})}
			</Swiper>
		</>
	)
}
