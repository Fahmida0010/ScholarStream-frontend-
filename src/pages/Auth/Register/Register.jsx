import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Shared/Button/Button';

const Register = () => {

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [firebaseError, setFirebaseError] = useState('');

  const handleRegistration = async (data) => {
    try {
      setFirebaseError(''); // Reset previous error
      const profileImg = data.photo[0];

      // 1️⃣ Create user in Firebase
      const result = await registerUser(data.email, data.password);
      console.log(result.user);

      // 2️⃣ Upload profile image to imgbb
      const formData = new FormData();
      formData.append('image', profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // 3️⃣ Store user in database
      const userInfo = { email: data.email, displayName: data.name, photoURL };
      const res = await axiosSecure.post('/users', userInfo);
      if (res.data.insertedId) console.log('User saved in DB');

      // 4️⃣ Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL });
      console.log('User profile updated');

      navigate(location.state || '/');
    } catch (error) {
      console.log(error);
      // Dynamic form error display
      if (error.code === 'auth/email-already-in-use') {
        setFirebaseError('Email already registered. Please login.');
      } else {
        setFirebaseError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <h3 className="text-3xl font-bold text-center text-green-400 mt-6">Welcome to ScholarStream</h3>
  

      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

          {/* Name */}
          <label className="label">Name</label>
          <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
          {errors.name && <p className="text-red-500">Name is required.</p>}

          {/* Photo */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo', { required: true })} className="file-input" />
          {errors.photo && <p className="text-red-500">Photo is required.</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
          {errors.email && <p className="text-red-500">Email is required.</p>}

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 8 characters or longer</p>}
          {errors.password?.type === 'pattern' && <p className="text-red-500">Password must contain uppercase, lowercase, number & special character</p>}

          {/* Firebase error */}
          {firebaseError && <p className="text-red-500 mt-2">{firebaseError}</p>}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <Button className="btn bg-pink-400 mt-4">
            Register</Button>
        </fieldset>

        <p>
          Already have an account?{' '}
          <Link state={location.state} className='text-blue-500 underline' to="/login">
            Login
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;

