import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // স্মুথ ট্রানজিশনের জন্য

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="bg-base-200">
      {/* Dynamic Slider */}
      <div className="w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade" // স্লাইডগুলো হালকা হয়ে মিলিয়ে যাবে
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {services.map((service) => (
            <SwiperSlide key={service._id}>
              <div
                className="relative h-full w-full flex items-center justify-center text-center bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* কালচে ওভারলে যা টেক্সটকে দৃশ্যমান করবে */}
                <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>

                {/* Content Area */}
                <div className="relative z-10 p-6 sm:p-10 md:p-16 max-w-4xl mx-4">
                  
                  {/* Title: Pink Gradient বা Solid Pink */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-lg text-pink-500 uppercase tracking-tight">
                    {service.title}
                  </h2>
                  
                  {/* Divider Line */}
                  <div className="w-24 h-1.5 bg-pink-500 mx-auto mb-6 rounded-full"></div>

                  {/* Description: White with better line height */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed drop-shadow-md max-w-2xl mx-auto opacity-95">
                    {service.description}
                  </p>

                  {/* Optional: Call to Action Button */}
                  <button className="mt-8 px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-pink-500/50">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* স্লাইডারের ডটগুলোর কালার ঠিক করার জন্য নিচের CSS টুকু ইনক্লুড করুন */}
      <style>{`
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #db2777 !important; opacity: 1; width: 25px; border-radius: 5px; transition: all 0.3s; }
      `}</style>
    </div>
  );
};

export default Services;