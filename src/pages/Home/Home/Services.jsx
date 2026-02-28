import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="bg-gray-50">

      {/* Dynamic Slider */}
      <div className="w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {services.map((service) => (
            <SwiperSlide key={service._id}>
              <div
                className="h-full flex items-center justify-center text-white text-center bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* Overlay */}
                <div className=" p-6 sm:p-10 md:p-16 
                rounded-xl max-w-3xl mx-4">
     <h2 className="text-2xl sm:text-3xl md:text-4xl text-pink-600
     lg:text-5xl font-extrabold mb-4 leading-tight">
                    {service.title}
                  </h2>
   <p className="text-sm sm:text-base md:text-xl lg:text-xl
    text-gray-100">
                    {service.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default Services;