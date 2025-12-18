import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import Button from "../../components/Shared/Button/Button";

const PaymentSuccess = () => {
  const [info, setInfo] = useState(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/verify-payment/${sessionId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!info) return <LoadingSpinner/>;

  return (
    <div className="p-14 text-center bg-green-100">
      <h1 className="text-green-500 font-bold">Payment Successfullly Completed!</h1>
      <p className="text-indigo-400 font-semibold">Scholarship: {info.scholarshipName}</p>
      <p  className="text-indigo-400 font-semibold">University: {info.universityName}</p>
      <p  className="text-indigo-400 font-semibold">Amount Paid: ${info.amountPaid}</p>

      <Button className="btn mt-4 max-w-1/2"
       onClick={() => window.location.href ="dashboard/my-applications"}>
        Go to My Applications
      </Button>
    </div>
  );
};

export default PaymentSuccess;  
