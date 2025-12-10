import React from "react";
import { motion } from "framer-motion";

import manstu from "../../../assets/images/manstu.jpg";
import girls from "../../../assets/images/girls.jpg";
import stuman from "../../../assets/images/stuman.jpg";
import girl from "../../../assets/images/girl.jpg";
import library from "../../../assets/images/library.jpg";
import human from "../../../assets/images/human scholar.jpg";


const SuccessStories = () => {
  return (
    <section className="mt-24 bg-gray-200 py-16 rounded-xl px-6">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl text-center font-bold text-green-700 mb-10"
      >
        Success Stories
      </motion.h2>

      <div className="relative max-w-4xl mx-auto  overflow-hidden">
        <motion.div
          className="flex gap-6"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear"
          }}
        >
            {/* CARD 1 */}
          <div className="min-w-[300px] bg-blue-200 shadow p-6 rounded-xl">
            <img src={library} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tahia Akter</h3>
            <p className="text-gray-700">
              Received <b>70% scholarship</b> in Hungery.
            </p>
          </div>

          {/* CARD 2*/}
          <div className="min-w-[300px] bg-red-200 shadow p-6 rounded-xl">
            <img src={human} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sanjida Akter</h3>
            <p className="text-gray-700">
              Successfully got into New Zealand with a <b>MEXT scholarship</b>.
            </p>
          </div>
          {/* CARD 3 */}
          <div className="min-w-[300px] bg-indigo-200 shadow p-6 rounded-xl">
            <img src={manstu} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fahim Ahmed</h3>
            <p className="text-gray-700">
              Got a <b>full scholarship</b> in USA with complete guidance.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="min-w-[300px] bg-red-200 shadow p-6 rounded-xl">
            <img src={girls} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sadia Karim</h3>
            <p className="text-gray-700">
              Achieved a <b>75% waiver</b> at University of Toronto.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="min-w-[300px] bg-sky-200 shadow p-6 rounded-xl">
            <img src={stuman} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mahir Hasan</h3>
            <p className="text-gray-700">
              Received <b>50% scholarship</b> in Australia.
            </p>
          </div>

          {/* CARD 6*/}
          <div className="min-w-[300px] bg-pink-200 shadow p-6 rounded-xl">
            <img src={girl} className="h-48 w-full object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Raisa Noor</h3>
            <p className="text-gray-700">
              Successfully got into Japan with a <b>MEXT scholarship</b>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
