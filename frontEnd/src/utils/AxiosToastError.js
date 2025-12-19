import { toast } from 'react-hot-toast';

const AxiosToastError = (error) => {
    toast.error(error?.response?.data?.message || "Ocorreu um erro. Tente novamente mais tarde.");
};

export default AxiosToastError;