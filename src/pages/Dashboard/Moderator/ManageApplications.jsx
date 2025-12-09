// ManageApplications.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:3000/applications");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/applications/${id}`, { applicationStatus: status });
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  // Submit feedback
  const handleFeedbackSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/applications/${id}`, { feedback: feedbackText });
      setFeedbackText("");
      setShowFeedbackModal(false);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  // Reject/Delete application
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this application?")) return;
    try {
      await axios.delete(`http://localhost:3000/applications/${id}`);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Applications</h2>
      
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border px-2 py-1">Applicant Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">University</th>
            <th className="border px-2 py-1">Feedback</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Payment</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} className="text-center">
              <td className="border px-2 py-1">{app.userName}</td>
              <td className="border px-2 py-1">{app.userEmail}</td>
              <td className="border px-2 py-1">{app.universityName}</td>
              <td className="border px-2 py-1">{app.feedback || "No feedback"}</td>
              <td className="border px-2 py-1">{app.applicationStatus}</td>
              <td className="border px-2 py-1">{app.paymentStatus}</td>
              <td className="border px-2 py-1 space-x-1">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => { setSelectedApp(app); setShowModal(true); }}
                >
                  Details
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => { setSelectedApp(app); setFeedbackText(app.feedback || ""); setShowFeedbackModal(true); }}
                >
                  Feedback
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleStatusUpdate(app._id, "processing")}
                >
                  Processing
                </button>
                <button
                  className="bg-purple-500 text-white px-2 py-1 rounded"
                  onClick={() => handleStatusUpdate(app._id, "completed")}
                >
                  Completed
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleReject(app._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">{selectedApp.userName} - {selectedApp.universityName}</h3>
            <p><strong>Email:</strong> {selectedApp.userEmail}</p>
            <p><strong>Degree:</strong> {selectedApp.degree}</p>
            <p><strong>Category:</strong> {selectedApp.scholarshipCategory}</p>
            <p><strong>Application Fees:</strong> ${selectedApp.applicationFees}</p>
            <p><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</p>
            <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Payment:</strong> {selectedApp.paymentStatus}</p>
            <p><strong>Feedback:</strong> {selectedApp.feedback || "No feedback"}</p>
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">Feedback for {selectedApp.userName}</h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write feedback..."
            />
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setShowFeedbackModal(false)}>Close</button>
              <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => handleFeedbackSubmit(selectedApp._id)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
