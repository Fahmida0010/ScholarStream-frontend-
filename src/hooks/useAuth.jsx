// import React, { use } from 'react'
// import { AuthContext } from '../contexts/AuthContext/AuthContext.jsx';


// const useAuth = () => {
//     const authinfo = use(AuthContext);
//     return authinfo;
// };


// export default useAuth;

import { useContext } from "react";

import { updateProfile, updateEmail } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext/AuthContext";


const useAuth = () => {
  const authInfo = useContext(AuthContext);

  //  Update name & photo
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //  Update email
  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };

  return {
    ...authInfo,
    updateUserProfile,
    updateUserEmail,
  };
};

export default useAuth;
