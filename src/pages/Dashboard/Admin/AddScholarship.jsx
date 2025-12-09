import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const [loading, setLoading] = useState(false);

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const scholarshipData = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      image: form.image.value,
      country: form.country.value,
      city: form.city.value,
      worldRank: form.worldRank.value,
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: form.tuitionFees.value,
      applicationFees: form.applicationFees.value,
      serviceCharge: form.serviceCharge.value,
      deadline: form.deadline.value,
      postDate: new Date(),
      userEmail: form.userEmail.value,
    };

    const res = await axios.post("http://localhost:3000/scholarships", scholarshipData);

    if (res.data.insertedId) {
      Swal.fire("Success!", "Scholarship Added Successfully!", "success");
      form.reset();
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Add Scholarship</h1>

      <form onSubmit={handleAddScholarship} className="grid grid-cols-2 gap-5 bg-white p-6 rounded-xl shadow">
        <input name="scholarshipName" placeholder="Scholarship Name" className="input" required />
        <input name="universityName" placeholder="University Name" className="input" required />
        <input name="image" placeholder="Image URL" className="input" required />
        <input name="country" placeholder="Country" className="input" required />
        <input name="city" placeholder="City" className="input" required />
        <input name="worldRank" placeholder="World Rank" className="input" required />
        <input name="subjectCategory" placeholder="Subject Category" className="input" required />
        <input name="scholarshipCategory" placeholder="Scholarship Category" className="input" required />
        <input name="degree" placeholder="Degree" className="input" required />
        <input name="tuitionFees" placeholder="Tuition Fees (Optional)" className="input" />
        <input name="applicationFees" placeholder="Application Fees" className="input" required />
        <input name="serviceCharge" placeholder="Service Charge" className="input" required />
        <input type="date" name="deadline" className="input" required />
        <input name="userEmail" placeholder="Admin Email" className="input" required />

        <button className="btn col-span-2 bg-green-600
         text-white" disabled={loading}>
          {loading ? "Adding..." : "Add Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship; 
