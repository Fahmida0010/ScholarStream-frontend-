import React from "react";
import { motion } from "framer-motion";
import Accordion from "./Accordion";

const FAQ = () => {
  const data = [
    {
      q: "How do I apply for a scholarship?",
      a: "Go to the scholarship details page and click the Apply button."
    },
    {
      q: "Is ScholarStream free?",
      a: "Yes, it is completely free for students."
    },
    {
      q: "How long does the review take?",
      a: "Usually 2–6 weeks depending on university."
    },
    {
      q: "Can I apply for multiple scholarships?",
      a: "Yes! There is no limit."
    },
    {
      q: "Do you help with SOP/CV?",
      a: "Yes! We provide tips and templates."
    }
  ];

  return (
    <section className="py-10 px-10 rounded-2xl bg-purple-200">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl text-center font-bold
         text-purple-700 mb-8"
      >
        Frequently Asked Questions (FAQ)
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {data.map((item, i) => (
          <Accordion key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
