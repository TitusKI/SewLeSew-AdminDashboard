import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export const Carousel = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return <Slider {...settings}>{children}</Slider>;
};

export const CarouselItem = ({ children }) => {
  return <div className="w-full flex justify-center">{children}</div>;
};
