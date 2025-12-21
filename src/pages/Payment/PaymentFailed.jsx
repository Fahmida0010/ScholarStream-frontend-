import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Shared/Button/Button";

const PaymentFailed = () => {
  const [info, setInfo] = useState(null);
 

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/verify-payment/${sessionId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-12 text-center m-4 ">
      <h1 className="text-red-500 font-bold text-3xl mb-2">❌ Payment Failed</h1>
  
       <p className = "mb-2 text-xl">Scholarship: {info?.scholarshipName}</p> 
      <p className="pb-4 text-red-400 text-xl font-semibold">Error: Payment was not completed</p>

      <Button className="btn max-w-1/2"
       onClick={() => window.location.href = "/dashboard"}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default PaymentFailed;

