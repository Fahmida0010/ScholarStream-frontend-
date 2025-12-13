import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Button from '../../../components/Shared/Button/Button';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, 
    formState:{errors} } = useForm();
    const{signInUser}= useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);



  const handleLogin = (data) => {
    console.log('form data ', data);
    signInUser(data.email, data.password)
    .then(result=>{
        console.log(result.user)
        navigate(location?.state || '/')

    })  
    .catch (error=>{
     console.log(error.message)
     
  if (error.code === "auth/wrong-password") {
    setLoginError("Wrong password ");
  } 
  else if (error.code === "auth/user-not-found") {
    setLoginError("No account found with this email ");
  } 
  else {
    setLoginError("Login failed. Please try again ");
  }
});
  
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm 
    shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome back</h3>
      <p className='font-bold mt-6 text-center'>Please Login</p>
      <form className="card-body m-4" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">

          {/* Email */}
          <label className="font-bold">Email</label>
          <input
            type="email"
            {...register('email', {required:true})}
            className="input"
            placeholder="Email"
          />
          {
            errors.email?.type==='required'&&
            <p className='text-red-500'>Email is required</p>
          }

          {/* Password */}
          <label className="font-bold pr-2">Password</label>
        <div className='relative'>
            <input
            type={showPassword? "text":"password"}
            {...register('password',{required:true,
                minLength:6}
             )}
            className="input w-full pr-10"
            placeholder="Password"
          />
        </div>
    <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-12 top-1/2 -translate-y-9 text-gray-500">
    {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
  </button>
        {loginError && (
  <p className="text-red-500 text-sm mt-2">{loginError}</p>
)}
   {
     errors.password?.type=== 'minLength' &&
     <p className='text-red-500'>Password must be 6
      characters or longer at least one capital letter, 
      & one special character.
</p>
   }
    <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <Button className="mt-4">Login</Button>
        </fieldset>
      <p>New to scholarStream <Link 
       state={location.state}    
       className='text-blue-500 underline' to ="/register">Register</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;

