// pages/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const PaymentSuccess = () => {
  const {id:scholarshipId } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    // Fetch scholarship details by ID (replace with your backend route)
    axios.get(`http://localhost:3000/scholarships/${scholarshipId}`)
      .then(res => setScholarship(res.data))
      .catch(err => console.log(err));
  }, [scholarshipId]);

  const handlePayment = () => {
    // Here you can integrate Stripe, PayPal, or any payment API
    alert("Payment successful! Application submitted.");
  };

  if (!scholarship) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pay for {scholarship.name}</h2>
      <p className="mb-2"><strong>University:</strong> {scholarship.universityName}</p>
      <p className="mb-2"><strong>Category:</strong> {scholarship.category}</p>
      <p className="mb-4"><strong>Application Fees:</strong> ${scholarship.applicationFees}</p>

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentSuccess;
