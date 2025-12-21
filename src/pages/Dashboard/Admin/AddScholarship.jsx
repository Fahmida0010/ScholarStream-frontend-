import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../components/Shared/Button/Button";
import { imageUpload } from "../../../utils";

const AddScholarship = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleAddScholarship = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const imageFile = form.image.files[0];
  // console.log(form)
    try {
      // SAME RULE AS AddPlantForm
      const imageUrl = await imageUpload(imageFile);

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
  console.log(scholarshipData)
  
      const res = await axiosSecure.post("/scholarships", scholarshipData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Scholarship Added Successfully!", "success");
        form.reset();
        setPreview(null);
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

        {/* IMAGE (same behavior, just cleaner) */}
        <input
          type="file"
          name="image"
          className="file-input"
          accept="image/*"
          required
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        )}

        <input name="country" placeholder="location" className="input" required />
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

        <Button>Add Scholarship</Button>
      </form>
    </div>
  );
};

export default AddScholarship;

