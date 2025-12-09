import axios from "axios";
import { useSearchParams } from "react-router";

const Checkout = () => {

  const handlePayment = async () => {

    const paymentInfo = {
      scholarshipName: "Harvard Scholarship",
      universityName: "Harvard University",
      applicationFees: 200,
      userId: "12345"
    };

    const res = await axios.post("http://localhost:3000/create-checkout-session", paymentInfo);

    window.location.href = res.data.url; // redirect to Stripe
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
