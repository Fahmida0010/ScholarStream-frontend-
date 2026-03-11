import React from "react";
import brown from "../../../assets/images/brown.png";
import columbia from "../../../assets/images/columbia.png";
import cornell from "../../../assets/images/cornell.png";
import harvard from "../../../assets/images/harvard.png";
import veritas from "../../../assets/images/veritas.png";
import veritasess from "../../../assets/images/veritasess.png";
import whiteuni from "../../../assets/images/whiteuni.png";
import prince from "../../../assets/images/prince.png";
import dartmounth from "../../../assets/images/dartmounth.png";


const logos = [
  brown,
  columbia,
  cornell,
  harvard,
  veritasess,
  veritas,
  whiteuni,
  prince,
  dartmounth,
];

const Partners = () => {
  return (
    /* bg-gray-50 বদলে bg-base-100 করা হয়েছে ডার্ক মোড ফিক্সের জন্য */
    <div className="bg-base-100 py-8 overflow-hidden transition-colors duration-300">
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap gap-8">
          {logos.concat(logos).map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`University Logo ${idx}`}
                /* লোগো যাতে ডার্ক মোডেও স্পষ্ট থাকে তাই হালকা brightness এড করা হয়েছে */
                className="object-contain h-16 w-auto filter hover:grayscale transition-all duration-300 dark:brightness-110"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Partners;