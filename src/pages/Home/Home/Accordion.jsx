// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const Accordion = ({ question, answer }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="border p-4 rounded-xl cursor-pointer"
//       onClick={() => setOpen(!open)}
//     >
//       <div className="flex justify-between items-center">
//         <h4 className="text-lg font-semibold">{question}</h4>
//         <span className="text-2xl">{open ? "−" : "+"}</span>
//       </div>

//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//         className="overflow-hidden"
//       >
//         <p className="text-gray-600 mt-3">{answer}</p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Accordion;
