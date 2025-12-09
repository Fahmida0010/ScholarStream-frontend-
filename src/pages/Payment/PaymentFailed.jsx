import { useEffect, useState } from "react";
import axios from "axios";

const PaymentFailed = () => {
  const [info, setInfo] = useState(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    axios.get(`http://localhost:3000/verify-payment/${sessionId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>❌ Payment Failed</h1>
      <p>Scholarship: {info?.scholarshipName}</p>
      <p>Error: Payment was not completed</p>

      <button onClick={() => window.location.href = "/dashboard"}>
        Return to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailed;
