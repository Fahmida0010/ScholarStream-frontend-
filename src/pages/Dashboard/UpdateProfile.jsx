import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';

const UpdateProfile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [preview, setPreview] = useState(
    user?.photoURL || 'https://via.placeholder.com/150'
  );
  const [uploadedImageURL, setUploadedImageURL] = useState(
    user?.photoURL || ''
  );
  const [uploading, setUploading] = useState(false);


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // instant preview
    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
        formData
      );

      const imageURL = res?.data?.data?.display_url;
      if (!imageURL) throw new Error('Image upload failed');

      setPreview(imageURL);
      setUploadedImageURL(imageURL);
      toast.success('Image uploaded successfully');

    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
      setPreview(user?.photoURL || 'https://via.placeholder.com/150');
    } finally {
      setUploading(false);
    }
  };

  // FIREBASE UPDATE 
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) throw new Error('User not logged in');

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };
  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating profile...');

    try {
      const name = data.name;
      const photoURL = uploadedImageURL || user?.photoURL;

      // update firebase
      await updateUserProfile(name, photoURL);
      await auth.currentUser.reload();
      setUser(auth.currentUser);

      toast.success('Profile Updated Successfully!', { id: toastId });

      navigate('/dashboard/profile');

    } catch (err) {
      console.error(err);
      toast.error(`Update failed: ${err.message}`, { id: toastId });
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* PHOTO */}
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
            />

            <label className="mt-3 cursor-pointer bg-indigo-50 px-4 py-1 rounded-full text-indigo-600 text-sm font-semibold hover:bg-indigo-100">
              {uploading ? 'Uploading...' : 'Choose New Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register('image')}
                onChange={handleImageChange}
                disabled={uploading}
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              {...register('name', { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          {/* SAVE */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {uploading ? 'Processing...' : 'Save Changes'}
          </button>

          {/* CANCEL */}
          <button
            type="button"
            onClick={() => navigate('../profile')}
            className="w-full text-gray-500 text-sm hover:underline"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
