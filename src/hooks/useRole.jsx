import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading, error } = useQuery({
    // ইউজার লোডিং শেষ না হওয়া পর্যন্ত এবং ইমেইল না পাওয়া পর্যন্ত কুয়েরি চলবে না
    enabled: !loading && !!user?.email, 
    queryKey: ['role', user?.email],
    queryFn: async () => {
      console.log(user)
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      console.log(data)
      return data.role;
    },
    retry: false, // Unauthorized হলে বারবার রিকোয়েস্ট পাঠানো বন্ধ করবে
  });

  return { role, isRoleLoading, error }; 
};

export default useRole;