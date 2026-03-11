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

    try {
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
    /* text-base-content নিশ্চিত করে ডার্ক মোডে লেখা সাদা হবে */
    <div className="text-base-content">
      <h1 className="text-2xl font-bold mb-5">Add Scholarship</h1>

      <form
        onSubmit={handleAddScholarship}
        /* bg-white বদলে bg-base-100 এবং বর্ডার যোগ করা হয়েছে */
        className="grid grid-cols-2 gap-5 bg-base-100 border border-base-300 p-6 rounded-xl shadow-lg transition-colors duration-300"
      >
        {/* daisyUI input ক্লাসের সাথে border-base-300 ব্যবহার করলে ডার্ক মোডে বর্ডার ক্লিয়ার থাকে */}
        <input name="scholarshipName" placeholder="Scholarship Name" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="universityName" placeholder="University Name" className="input input-bordered border-base-300 bg-base-100" required />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered border-base-300 bg-base-100"
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
            className="w-32 h-32 object-cover rounded-lg border border-base-300"
          />
        )}

        <input name="country" placeholder="Location" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="city" placeholder="City" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="worldRank" placeholder="World Rank" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="subjectCategory" placeholder="Subject Category" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="scholarshipCategory" placeholder="Scholarship Category" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="degree" placeholder="Degree" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="tuitionFees" placeholder="Tuition Fees (Optional)" className="input input-bordered border-base-300 bg-base-100" />
        <input name="applicationFees" placeholder="Application Fees" className="input input-bordered border-base-300 bg-base-100" required />
        <input name="serviceCharge" placeholder="Service Charge" className="input input-bordered border-base-300 bg-base-100" required />
        <input type="date" name="deadline" className="input input-bordered border-base-300 bg-base-100 text-base-content" required />
        <input name="userEmail" placeholder="Admin Email" className="input input-bordered border-base-300 bg-base-100" required />

        <div className="col-span-2">
           <Button className="w-full">Add Scholarship</Button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;