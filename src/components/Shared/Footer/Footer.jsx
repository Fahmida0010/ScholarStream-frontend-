import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import Logo from '../../Logo/Logo';


 
const Footer = () => {
  return (
   <footer className="footer footer-horizontal
    footer-center bg-amber-200 p-10 mb-4">
  <aside>
        <div className ="mb-1 items-center">
         <Logo></Logo>
     </div>
   
    <p className="font-bold"> 
    A scholarship isn’t just financial support,
     it’s a recognition of <br/> your hard work, potential, 
      and the bright future you’re destined to create.
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a  className = "hover:bg-gray-400">
      <FaXTwitter className="w-6 h-6" />
      </a>
      <a  className = "hover:bg-red-600" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a className = "hover:bg-blue-600 bg-blue-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
  );
};

export default Footer;