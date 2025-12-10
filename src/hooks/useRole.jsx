import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;   // user আসার আগে call হবে না

    const fetchRole = async () => {
      try {
        setIsRoleLoading(true);

        const { data } = await axiosSecure.get(`/users/role/${user.email}`);

        setRole(data?.role); // backend থেকে role set
      } catch (error) {
        console.log("Role fetch error:", error);
      } finally {
        setIsRoleLoading(false);
      }
    };

    fetchRole();
  }, [user?.email, axiosSecure]);

  return { role, isRoleLoading };
};

export default useRole;
