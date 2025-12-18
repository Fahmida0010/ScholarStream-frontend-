import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Button from "../../components/Shared/Button/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const {id } = useParams(); 
  const{user} = useAuth();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH SCHOLARSHIP BY ID
  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
        setScholarship(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load scholarship data");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

    // HANDLE PAYMENT
  const handlePayment = async () => {
    if (!scholarship) return;

    setLoading(true);
    setError(null);

    try {
      const paymentInfo = {
        scholarshipId: id,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        applicationFees: scholarship.applicationFees,
        address: scholarship.country,
        subjectCategory:scholarship.subjectCategory,
        //userId:user.id,
        userEmail:user?.email,
        userName :user?.displayName

      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      // redirect to Stripe checkout page
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      setError("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner/>;
  if (error) return <ErrorPage/>;

  return (
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-lg mt-10">
    

      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <img
        src={scholarship.image}
        alt={scholarship.universityName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <p>
        <strong>Scholarship:</strong> {scholarship.scholarshipName}
      </p>
      <p>
        <strong>University:</strong> {scholarship.universityName}
      </p>
        <p>
        <strong>Subject Category:</strong> {scholarship.subjectCategory}
      </p>
        <p>
        <strong>Address:</strong> {scholarship.country}
      </p>
      <p>
        <strong>Application Fees:</strong> ${scholarship.applicationFees}
      </p>

      <div className =" justify-between">
        <Button
        className="btn bg-pink-500 text-white w-full mt-4 max-w-1/2"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
        <Link to="/payment-failed">
        <Button
       type="button"
        className="bg-red-500 max-w-1/2 btn mt-3"
       >
      Cancel 
     </Button>
      </Link>
      </div>
    </div>
  );
};

export default Checkout;