import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Button from "../../../components/Shared/Button/Button";

const API = "http://localhost:3000";

const Feedback = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axios.get(`${API}/manage-application/${id}`).then((res) => {
      setApplication(res.data);
    });
  }, [id]);

  const handleSubmit = async () => {
    await axios.post(`${API}/feedback/${id}`, {
      feedbackText: feedback,
      adminEmail: "admin@example.com",
    });

    alert("Feedback submitted successfully!");
  };

  if (!application) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Give Feedback</h2>

      <p className="mb-3">
        <strong>Applicant:</strong> {application.applicantName}
      </p>

      <textarea
        className="w-full border p-2 rounded h-32"
        placeholder="Write feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <Button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Submit
      </Button>
    </div>
  );
};

export default Feedback;
