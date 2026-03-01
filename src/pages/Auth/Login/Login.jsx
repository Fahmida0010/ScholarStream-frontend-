import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Button from '../../../components/Shared/Button/Button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';

const Login = () => {

  const { signInUser, setUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    try {

      setLoginError("");

      // Firebase Login
      const result = await signInUser(data.email, data.password);
      const loggedUser = result.user;

      //  Get Firebase ID Token
      const token = await loggedUser.getIdToken();

      console.log("Firebase Token:", token);

      // Save token
      localStorage.setItem("access-token", token);

      //  Save user
      setUser(loggedUser);

      // Redirect
      navigate(location.state?.from || "/");

    } catch (error) {
      console.log("Firebase Error:", error.code);
      setLoginError(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome back</h3>
      <p className='font-bold mt-6 text-center'>Please Login</p>

      <form className="card-body m-4" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">

          {/* Email */}
          <label className="font-bold">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === 'required' && 
            <p className='text-red-500'>Email is required</p>
          }

          {/* Password */}
          <label className="font-bold pr-2">Password</label>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              {...register('password', { required: true, minLength: 6 })}
              className="input w-full pr-10"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {errors.password?.type === 'required' && 
            <p className='text-red-500'>Password is required</p>
          }

          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>
              Password must be 6 characters or longer
            </p>
          )}

          {/* Login error */}
          {loginError && 
            <p className="text-red-500 text-sm mt-2">{loginError}</p>
          }

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <Button type="submit" className="mt-4">Login</Button>
        </fieldset>

        <p className="mt-2">
          New to ScholarStream?{' '}
          <Link 
            state={location.state} 
            className='text-blue-500 underline' 
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;