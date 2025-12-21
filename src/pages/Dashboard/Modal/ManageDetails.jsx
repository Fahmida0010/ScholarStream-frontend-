import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../components/Shared/Button/Button";

const ManageDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`${import.meta.env.VITE_API_URL}/manage-details/${id}`)
      .then(res => {
        setApplication(res.data);
        setLoading(false);
      });
  }, [axiosSecure, id]);

  if (loading) return <LoadingSpinner />;



  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">


      <h2 className="text-2xl font-bold mb-4">Manage Application Details</h2>

      <div className="space-y-2">
        <p><b>Applicant Name:</b> {application.userName}</p>
        <p><b>Email:</b> {application.userEmail}</p>
        <p><b>University:</b> {application.universityName}</p>
        <p><b>Scholarship Category:</b> {application.scholarshipCategory}</p>
        <p><b>Degree:</b> {application.degree}</p>

        <p>
          <b>Application Status:</b>
          <span className="badge badge-info ml-2">
            {application.applicationStatus}
          </span>
        </p>

        <p>
          <b>Payment Status:</b>
          <span className="badge badge-success ml-2">
            {application.paymentStatus}
          </span>
        </p>

        <p>
          <b>Feedback:</b><br />
          {application.feedback || "No feedback given"}
        </p>
        <Button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4"
      >
        ← Back
      </Button>
      </div>
    </div>
  );
};

export default ManageDetails;
