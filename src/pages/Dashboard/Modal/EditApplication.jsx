import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const API = "http://localhost:3000";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    universityName: "",
    universityAddress: "",
    subjectCategory: "",
    applicationFees: ""
  });

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = async () => {
    try {
      const res = await axios.get(`${API}/myapplications/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/applications/${id}`, form);

      alert("Application updated successfully!");
      navigate("/dashboard/my-applications");
    } catch (err) {
      alert("Failed to update");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-yellow-600">Update Application</h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <div>
          <label>University Name</label>
          <input
            type="text"
            name="universityName"
            value={form.universityName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="universityAddress"
            value={form.universityAddress}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Subject Category</label>
          <input
            type="text"
            name="subjectCategory"
            value={form.subjectCategory}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label>Application Fees</label>
          <input
            type="number"
            name="applicationFees"
            value={form.applicationFees}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Update Application
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
