import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase.init';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(user?.photoURL || 'https://via.placeholder.com/150');
  const [uploading, setUploading] = useState(false);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Firebase update function
  const updateUserProfile = async (name, photo) => {
    if (!auth.currentUser) throw new Error('User not logged in');
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Form submission
  const onSubmit = async (data) => {
    const image = data.image?.[0];
    const name = data.name;
    const toastId = toast.loading('Updating profile...');
    setUploading(true);

    try {
      let photoURL = user?.photoURL;

      // Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const { data: res } = await axiosSecure.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
          formData
        );

        // Correct path to image URL
        photoURL = res.data.data.display_url;
      }

      // Update Firebase profile
      await updateUserProfile(name, photoURL);

      // Update local user state
      setUser({ ...user, displayName: name, photoURL });

      toast.success('Profile Updated Successfully!', { id: toastId });
     // navigate('/dashboard/profile');
    } catch (err) {
      console.error(err);
      toast.error(`Update failed: ${err.message}`, { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Photo Preview */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={preview}
                alt="preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
              />
            </div>
            <label className="mt-3 cursor-pointer bg-indigo-50 px-4 py-1 rounded-full text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition">
              Choose New Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register('image')}
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              {...register('name', { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Enter your name"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
          >
            {uploading ? 'Processing...' : 'Save Changes'}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full text-gray-500 text-sm font-medium hover:underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
