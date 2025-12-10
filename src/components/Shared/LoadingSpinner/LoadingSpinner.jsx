// import React from 'react'

// const LoadingSpinner = () => {
//   return (
//     <div>
// <div class="loader"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import { HashLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex flex-col justify-center items-center`}
    >
      <HashLoader size={80} color="#00FF99" />
    </div>
  );
};

export default LoadingSpinner;
