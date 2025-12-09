import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateScholarship = () => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/scholarships/${id}`).then((res) => setSch(res.data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updated = {
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
    };

    const res = await axios.put(`http://localhost:3000/scholarships/${id}`, updated);

    if (res.data.modifiedCount) {
      Swal.fire("Updated!", "Scholarship Updated Successfully!", "success");
    }
  };

  if (!sch) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Update Scholarship</h1>

      <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-5 bg-white p-6 rounded-xl shadow">
        <input name="scholarshipName" defaultValue={sch.scholarshipName} className="input" />
        <input name="universityName" defaultValue={sch.universityName} className="input" />
        <input name="image" defaultValue={sch.image} className="input" />
        <input name="country" defaultValue={sch.country} className="input" />
        <input name="city" defaultValue={sch.city} className="input" />
        <input name="worldRank" defaultValue={sch.worldRank} className="input" />
        <input name="subjectCategory" defaultValue={sch.subjectCategory} className="input" />
        <input name="scholarshipCategory" defaultValue={sch.scholarshipCategory} className="input" />
        <input name="degree" defaultValue={sch.degree} className="input" />
        <input name="tuitionFees" defaultValue={sch.tuitionFees} className="input" />
        <input name="applicationFees" defaultValue={sch.applicationFees} className="input" />
        <input name="serviceCharge" defaultValue={sch.serviceCharge} className="input" />
        <input type="date" name="deadline" defaultValue={sch.deadline} className="input" />

        <button className="btn col-span-2 bg-blue-600 text-white">Update</button>
      </form>
    </div>
  );
};

export default UpdateScholarship;
