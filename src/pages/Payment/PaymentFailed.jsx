import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Shared/Button/Button";

const PaymentFailed = () => {
  const [info, setInfo] = useState(null);
 //  const { id } = useParams();
  //const [sch, setSch] = useState(null);


  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    axios.get(`http://localhost:3000/verify-payment/${sessionId}`)
      .then(res => setInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-12 text-center ">
      <h1 className="text-red-500 font-bold">❌ Payment Failed</h1>
  
       <p>Scholarship: {info?.scholarshipName}</p> 
      <p className="pb-4 text-red-400 font-semibold">Error: Payment was not completed</p>

      <Button className="btn max-w-1/2"
       onClick={() => window.location.href = "/dashboard"}>
        Return to Dashboard
      </Button>
    </div>
  );
};

export default PaymentFailed;
