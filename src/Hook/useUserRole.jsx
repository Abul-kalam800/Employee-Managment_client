import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUserRole = () => {
  const { user, loading } = useAuth();
 const axioesInstance = useAxios();

  const { data: role="admin", roleLoading } = useQuery({
    enabled: !!user?.email && !loading, // Query fires only if user email is ready
    queryKey: ["/employee", user?.email],
    queryFn: async () => {
      const res = await axioesInstance.get(`/allemployee/${user?.email}/role`);
      return res.data.role;
    },
  });

  return { role , roleLoading ,loading };
};

export default useUserRole;
