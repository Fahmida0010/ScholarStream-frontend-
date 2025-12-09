import axios from "axios";
import { useState } from "react";

const Checkout = () => {
  // Static scholarship data (no ID from URL)
  const scholarship = {
    scholarshipName: "Harvard Scholarship",
    universityName: "Harvard University",
    applicationFees: 200,
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const paymentInfo = {
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        applicationFees: scholarship.applicationFees,
        userId: "12345", // replace with actual logged-in user ID
      };

      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        paymentInfo
      );

      // redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      setError("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout Page</h2>
      <p>
        <strong>Scholarship:</strong> {scholarship.scholarshipName}
      </p>
      <p>
        <strong>University:</strong> {scholarship.universityName}
      </p>
      <p>
        <strong>Application Fees:</strong> ${scholarship.applicationFees}
      </p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className="btn bg-pink-400 mt-4"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Checkout;
