// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';


// const useRole = () => {
//  const {user, loading} = useAuth()
// const axiosSecure = useAxiosSecure()

// const {data :role, isLoading: isRoleLoading} = useQuery({
//     enabled: !loading  && !!user?.email, 
//  queryKey: ['role', user?.email],
//  queryFn : async() => {
// const {data} = await axiosSecure.get(`/user/role/${user?.email}`);
// return data.role;

//  },
// })

//  return{role, isRoleLoading } 
// }


// export default useRole;    

import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:3000/users/${user._id}`)
        .then((res) => {
          console.log("Backend response:", res.data); // ✅ check
          setRole(res.data.role);
          setIsRoleLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setRole(null);
          setIsRoleLoading(false);
        });
    } else {
      setRole(null);
      setIsRoleLoading(false);
    }
  }, [user]);

  return { role, isRoleLoading };
};

export default useRole;
