import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";

const PaymentSuccess = () => {
  const [info, setInfo] = useState(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    axios.get(`http://localhost:3000/verify-payment/${sessionId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!info) return <LoadingSpinner/>;

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Scholarship: {info.scholarshipName}</p>
      <p>University: {info.universityName}</p>
      <p>Amount Paid: ${info.amountPaid}</p>

      <button className="btn bg-green-400"
       onClick={() => window.location.href ="my-applications"}>
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
