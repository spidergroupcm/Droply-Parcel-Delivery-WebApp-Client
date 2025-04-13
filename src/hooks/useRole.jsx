import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`)
            return data.role
        }
    })
    // console.log(role, isLoading)
    return [role, isLoading]
};

export default useRole;