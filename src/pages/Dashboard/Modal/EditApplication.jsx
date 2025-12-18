import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";

const API =import.meta.env.VITE_API_URL

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    universityName: "",
    universityAddress: "",
    subjectCategory: "",
    applicationFees: "",
  });

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication = async () => {
    try {
      const res = await axios.get(`${API}/myapplications/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log("Error loading application:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load application data!",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${API}/myapplications/${id}`, form);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Application updated successfully!",
      }).then(() => {
        navigate("/dashboard/my-applications");
      });
    } catch (err) {
      console.log("Update Error:", err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to update application.",
      });
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

        <Button
          type="submit"
          className=""
        >
          Update Application
        </Button>
      </form>
    </div>
  );
};

export default EditApplication;
