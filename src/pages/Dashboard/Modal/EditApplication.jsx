import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const API = import.meta.env.VITE_API_URL;

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    universityName: "",
    universityAddress: "",
    subjectCategory: "",
    applicationFees: "",
  });

  useEffect(() => {
    loadApplication();
  }, [id]);

  const loadApplication = async () => {
    try {
      const res = await axiosSecure.get(`${API}/application/${id}`);
      setForm(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to load data", "error");
    }
  };

  // Single onChange for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Button e direct onClick diye update
  const handleUpdate = async () => {
    const { _id, ...dataToSend } = form;
    dataToSend.applicationFees = Number(dataToSend.applicationFees);

    try {
      await axiosSecure.put(`${API}/myapplications/${id}`, dataToSend);
      Swal.fire("Success!", "Application updated!", "success").then(() => {
        navigate("/dashboard/my-applications");
      });
    } catch (err) {
      Swal.fire("Failed!", "Could not update application.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-yellow-600">
        Update Application
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <input
          type="text"
          name="universityName"
          value={form.universityName || ""}
          onChange={handleChange}
          placeholder="University Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="universityAddress"
          value={form.universityAddress || ""}
          onChange={handleChange}
          placeholder="University Address"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="subjectCategory"
          value={form.subjectCategory || ""}
          onChange={handleChange}
          placeholder="Subject Category"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="applicationFees"
          value={form.applicationFees || ""}
          onChange={handleChange}
          placeholder="Application Fees"
          className="w-full border rounded-lg p-3"
        />

        {/* Button e onClick diye direct update */}
        <button
          onClick={handleUpdate}
          className="w-full bg-yellow-600 text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition"
        >
          Update Application
        </button>
      </div>
    </div>
  );
};

export default EditApplication;