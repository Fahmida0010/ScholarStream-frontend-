// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';
// import toast from 'react-hot-toast';
// import { updateProfile } from 'firebase/auth';
// import useAuth from '../../hooks/useAuth';
// import { auth } from '../../firebase/firebase.init';
// import axios from 'axios';

// const UpdateProfile = () => {
//   const { user, setUser } = useAuth();
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();
//   const [preview, setPreview] = useState(user?.photoURL || 'https://via.placeholder.com/150');
//   const [uploadedImageURL, setUploadedImageURL] = useState(user?.photoURL || '');
//   const [uploading, setUploading] = useState(false);

//   // Handle image preview and upload
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Show preview immediately
//       setPreview(URL.createObjectURL(file));
      
//       try {
//         setUploading(true);
//         const formData = new FormData();
//         formData.append('image', file);

//         const data = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
//           formData
//         );
//   console.log(data)
//         // Store the uploaded image URL
//         const imageURL = data?.data?.data?.image?.url;
//         setPreview(imageURL);
//         setUploadedImageURL(imageURL);
//         toast.success('Image uploaded successfully!');
//       } catch (err) {
//         console.error('Image upload error:', err);
//         toast.error('Failed to upload image');
//         // Revert to original preview on error
//         setPreview(user?.photoURL || 'https://via.placeholder.com/150');
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   // Firebase update function
//   const updateUserProfile = async (name, photo) => {
//     if (!auth.currentUser) throw new Error('User not logged in');
    
//     await updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   // Form submission
//   const onSubmit = async (data) => {
//     const name = data.name;
//     const toastId = toast.loading('Updating profile...');

//     try {
//       // Use the uploaded image URL if available, otherwise keep existing
//       const photoURL = uploadedImageURL || user?.photoURL;

//       // Update Firebase profile
//       await updateUserProfile(name, photoURL);

//       // Update local user state
//       setUser({ ...user, displayName: name, photoURL });

//       toast.success('Profile Updated Successfully!', { id: toastId });
//       navigate('/dashboard/profile');
//     } catch (err) {
//       console.error(err);
//       toast.error(`Update failed: ${err.message}`, { id: toastId });
//     }
//   };

//   if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>

//         <div className="space-y-4">
//           {/* Photo Preview */}
//           <div className="flex flex-col items-center mb-4">
//             <div className="relative">
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
//               />
//             </div>
//             <label className="mt-3 cursor-pointer bg-indigo-50 px-4 py-1 rounded-full text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition">
//               {uploading ? 'Uploading...' : 'Choose New Photo'}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 {...register('image')}
//                 onChange={handleImageChange}
//                 disabled={uploading}
//               />
//             </label>
//           </div>

//           {/* Name Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               defaultValue={user?.displayName || ''}
//               {...register('name', { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//               placeholder="Enter your name"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             onClick={handleSubmit(onSubmit)}
//             disabled={uploading}
//             className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md"
//           >
//             {uploading ? 'Processing...' : 'Save Changes'}
//           </button>

//           {/* Cancel Button */}
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="w-full text-gray-500 text-sm font-medium hover:underline"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // ✅ correct import
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

  // ================= IMAGE UPLOAD =================
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

  // ================= FIREBASE UPDATE =================
  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) throw new Error('User not logged in');

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };

  // ================= FORM SUBMIT =================
  const onSubmit = async (data) => {
    const toastId = toast.loading('Updating profile...');

    try {
      const name = data.name;
      const photoURL = uploadedImageURL || user?.photoURL;

      // update firebase
      await updateUserProfile(name, photoURL);

      // 🔥 reload firebase user (VERY IMPORTANT)
      await auth.currentUser.reload();

      // 🔥 sync context
      setUser(auth.currentUser);

      toast.success('Profile Updated Successfully!', { id: toastId });

      // ✅ navigate to dashboard/profile
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
