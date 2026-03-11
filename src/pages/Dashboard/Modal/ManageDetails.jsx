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
    <div className="max-w-3xl mx-auto bg-base-100 
    p-6 rounded shadow border border-base-300">
      
      <h2 className="text-2xl font-bold mb-6 text-base-content border-b border-base-300 pb-2">
        Manage Application Details
      </h2>

      <div className="space-y-3 text-base-content">
        <p><b className="text-primary font-semibold">Applicant Name:</b> {application?.userName}</p>
        <p><b className="text-primary font-semibold">Email:</b> {application?.userEmail}</p>
        <p><b className="text-primary font-semibold">University:</b> {application?.universityName}</p>
        <p>
          <b className="text-primary font-semibold">Application Status:</b>
          <span className="badge badge-info ml-2 font-bold uppercase text-[10px]">
            {application?.applicationStatus}
          </span>
        </p>

        <p>
          <b className="text-primary font-semibold">Payment Status:</b>
          <span className="badge badge-success ml-2 font-bold uppercase text-[10px]">
            {application?.paymentStatus}
          </span>
        </p>

        <p className="mt-4">
          <b className="text-primary font-semibold">Feedback:</b><br />
          <span className="opacity-80 block p-3 bg-base-200 rounded-lg mt-2 italic border border-base-300">
            {application?.feedback || "No feedback given"}
          </span>
        </p>

        <div className="pt-4">
          <Button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline border-base-300 hover:bg-base-300"
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageDetails;