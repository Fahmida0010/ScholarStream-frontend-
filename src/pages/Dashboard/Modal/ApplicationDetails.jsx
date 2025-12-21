import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const API =import.meta.env.VITE_API_URL

const ApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
 const axiosSecure = useAxiosSecure();

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const res = await axiosSecure(`${API}/application/${id}`);
      console.log(res.data)
      setApplication(res.data);
    } catch (err) {
      console.log("Error loading details:", err);
    }
  };

 if (!application)
    return <LoadingSpinner/>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Application Details
      </h1>

      <div className="bg-indigo-100 shadow-lg rounded-xl p-6 space-y-3">
        <p className ="text-pink-700"><b className="text-purple-500">University:</b> {application.universityName}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Address:</b> {application.address}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Category:</b> {application.subjectCategory}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Fees:</b> ${application.applicationFees}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Status:</b> {application.applicationStatus}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Payment:</b> {application.paymentStatus}</p>
        <p  className ="text-pink-700"><b  className="text-purple-500">Feedback:</b> {application.feedback || "No feedback yet"}</p>
      </div>
    </div>
  );
};

export default ApplicationDetails;

