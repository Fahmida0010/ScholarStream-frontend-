// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
// import axios from "axios";
// import Button from "../../components/Shared/Button/Button";

// const Checkout = ({isOpen, payments}) => {
//   const { id } = useParams();
//   const [sch, setSch] = useState(null);
  

//   useEffect(() => {
//     fetch(`http://localhost:3000/checkout/${id}`)
//       .then((res) => res.json())
//       .then((data) => setSch(data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!sch) return <LoadingSpinner />;

  
//   const handlePayment = async () => {
//     try {
//       const paymentInfo = {
//         scholarshipId: sch._id,
//         scholarshipName: sch.scholarshipName,
//         universityName: sch.universityName,
//         applicationFees: sch.applicationFees,
//         userId :user._id,
//         student: {
//           scholarshipName,
//           universityName,
//           amountPaid,
//           userId
//         },
//       };

//       const result = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//         paymentInfo
//       );

//       if (result.data?.url) {
//         window.location.replace(result.data.url);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div className="w-[85%] mx-auto my-10">
//       <h1 className="text-4xl font-bold mb-6">Checkout</h1>

//       <p><strong>Scholarship:</strong> {sch.scholarshipName}</p>
//       <p><strong>University:</strong> {sch.universityName}</p>
//       <p><strong>Application Fees:</strong> ${sch.applicationFees}</p>
//  <div className="flex justify-between m-4 space-x-3">
//       <Button
//         onClick={handlePayment}
//         className=""
//       >
//         Pay
//       </Button>
//         <Button 
//         onClick={handlePayment}
//         className="bg-red-500"
//       >
//         Cancel
//       </Button>
// </div>
//     </div>
//   );
// };

// export default Checkout;

import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Shared/Button/Button";

const Checkout = ({}) => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/checkout/${id}`)
      .then((res) => res.json())
      .then((data) => setSch(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!sch) return <LoadingSpinner />;



  const handlePayment = async () => {
    try {
      const paymentInfo = {
        scholarshipName: sch.scholarshipName,
        universityName: sch.universityName,
        applicationFees: sch.applicationFees,
        userId: "user._id", 
      };

      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };


  return (
    <div className="w-[90%] mx-auto my-10">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>

      <p>
        <strong>Scholarship:</strong> {sch.scholarshipName}
      </p>
      <p>
        <strong>University:</strong> {sch.universityName}
      </p>
      <p>
        <strong>Application Fees:</strong> ${sch.applicationFees}
      </p>
  
    <div className="p-4 justify-center  mt-4">
        <Button
        onClick={handlePayment}
        type="button"
        className="max-w-1/2 "
      >
        Pay
      </Button>

       <Link to="/payment-failed">
        <Button
        type="button"
        className="bg-red-500 max-w-1/2 "
      >
      Cancel 
      </Button>
       </Link>
    </div>
    </div>
  );
};

export default Checkout;
