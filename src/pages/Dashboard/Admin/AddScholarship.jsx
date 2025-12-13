
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Button from "../../../components/Shared/Button/Button";

const AddScholarship = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      // 1️⃣ Upload image to imgbb (same method as Register page)
      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const imageUrl = imgRes.data.data.url;

      // 2️⃣ Prepare scholarship data
      const scholarshipData = {
        scholarshipName: form.scholarshipName.value,
        universityName: form.universityName.value,
        image: imageUrl,
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

      // 3️⃣ Save to your backend
      const res = await axiosSecure.post("/scholarships", scholarshipData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Scholarship Added Successfully!", "success");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Add Scholarship</h1>

      <form
        onSubmit={handleAddScholarship}
        className="grid grid-cols-2 gap-5 bg-white p-6 rounded-xl shadow"
      >
        <input name="scholarshipName" placeholder="Scholarship Name" className="input" required />
        <input name="universityName" placeholder="University Name" className="input" required />

        {/* Image Upload - same as Register */}
        <input
          type="file"
          name="image"
          className="file-input"
          accept="image/*"
          required
        />

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

        <Button className="">
          Add Scholarship
        </Button>
      </form>
    </div>
  );
};

export default AddScholarship;
