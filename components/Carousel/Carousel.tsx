import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Virtual, Keyboard, Mousewheel, Lazy, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Carousel = ({ carouselItems }) => (
  <Swiper
    modules={[Navigation, Pagination, A11y, Virtual, Keyboard, Mousewheel, Lazy, Autoplay]}
    slidesPerView={1}
    breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1500: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }}
    navigation
    pagination={{
      clickable: true,
      type: 'progressbar',
    }}
    rewind
    mousewheel
    lazy
    keyboard={{
      enabled: true,
    }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: true,
    }}
  >
    {carouselItems.map((item, index) => (
      <SwiperSlide key={index}>{item}</SwiperSlide>
    ))}
  </Swiper>
)

export default Carousel