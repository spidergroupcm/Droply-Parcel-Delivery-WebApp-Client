import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_LINK
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;


