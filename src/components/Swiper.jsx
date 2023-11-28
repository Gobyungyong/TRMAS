import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper as SW } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Swiper({ children }) {
  return (
    <SW
      modules={[Navigation, Pagination, Scrollbar]}
      slidesPerView={1}
      rewind
      navigation
      pagination={{ clickable: true }}
      className="w-full max-w-xl border border-indigo-400 p-2 rounded-md focus:outline-none focus:border-indigo-700 focus:border-2 h-96 flex items-center justify-center"
    >
      {children}
    </SW>
  );
}

export default Swiper;
