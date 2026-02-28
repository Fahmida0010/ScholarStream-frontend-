import React, { useState } from "react";
import { motion } from "framer-motion";
import manstu from "../../../assets/images/manstu.jpg";
import girls from "../../../assets/images/girls.jpg";
import stuman from "../../../assets/images/stuman.jpg";
import girl from "../../../assets/images/girl.jpg";
import library from "../../../assets/images/library.jpg";
import human from "../../../assets/images/human scholar.jpg";

const SuccessStories = () => {
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    { img: library,  name: "Tahia Akter",    desc: "Received 70% scholarship in Hungary." },
    { img: human,    name: "Sanjida Akter",  desc: "Successfully got into New Zealand with a MEXT scholarship." },
    { img: manstu,   name: "Fahim Ahmed",    desc: "Got a full scholarship in USA with complete guidance." },
    { img: girls,    name: "Sadia Karim",    desc: "Achieved a 75% waiver at University of Toronto." },
    { img: stuman,   name: "Mahir Hasan",    desc: "Received 50% scholarship in Australia." },
    { img: girl,     name: "Raisa Noor",     desc: "Successfully got into Japan with a MEXT scholarship." },
  ];

  const scrollDistance = -1960;

  return (
    <section className=" bg-gray-100 py-12 md:py-16 
    rounded-xl  sm:px-6 lg:px-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl text-center font-bold text-green-500 py-5 px-8 rounded-xl mx-auto mb-10 md:mb-12"
      >
        Success Stories
      </motion.h2>

      {/* Marquee wrapper – pause on hover/touch */}
      <div
        className="relative overflow-hidden will-change-transform cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 md:gap-8 min-w-max"
          animate={isPaused ? false : { x: [0, scrollDistance, 0] }}
          transition={{
            duration: 50,               // slower = smoother & more readable
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Double the cards for seamless loop */}
          {cards.concat(cards).map((card, idx) => (
            <div
              key={idx}
              className="min-w-[300px] w-[300px] h-[440px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={card.img}
                alt={`${card.name} - success story`}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {card.name}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed flex-1">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;