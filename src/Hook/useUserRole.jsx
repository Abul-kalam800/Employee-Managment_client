import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUserRole = () => {
  const { user, loading } = useAuth();
 const axioesInstance = useAxios();

  const { data: role, isLoading } = useQuery({
    enabled: !!user?.email && !loading, // Query fires only if user email is ready
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axioesInstance.get(`/users/${user?.email}/role`);
      return res.data.role;
    },
  });
  

  return { role , isLoading ,loading };
};

export default useUserRole;
