import styles from "./Slider.module.scss";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ReactNode, useEffect, useRef } from "react";
import Icon from "../../atoms/Icon/Icon";

type PerViewType = {
  small?: number;
  medium?: number;
  large?: number;
};

interface SliderProps<T> {
  data: T[];
  renderItem: (data: T) => ReactNode;
  perView?: PerViewType;
  className?: string;
}

const Slider = <T,>({
  data,
  renderItem,
  perView = { small: 1 },
  className,
}: SliderProps<T>) => {
  // ---custom arrows
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance) {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
    }
  }, []);
  // -----custom arrows---//

  return (
    <div className={`${styles.sliderWrapper} ${className}`}>
      <button ref={prevRef} className={styles.customPrev}>
        <Icon name="arrowMore" />
      </button>
      <button ref={nextRef} className={styles.customNext}>
        <Icon name="arrowMore" />
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        // slidesPerView={perView}
        // navigation={{ enabled: false }}
        breakpoints={{
          600: {
            slidesPerView: perView.medium,
          },
          800: {
            slidesPerView: perView.large,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        //   pagination={{ clickable: true }}
      >
        {data &&
          data.length > 0 &&
          data.map((elem, index) => (
            <SwiperSlide key={index}>{renderItem(elem)}</SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
