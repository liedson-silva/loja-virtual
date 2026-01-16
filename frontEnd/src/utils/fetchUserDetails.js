import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails,
        });

        return response.data;
    }
    catch (error) {
        console.error('Erro ao buscar detalhes do usuário:', error);
        return null;
    }
};

export default fetchUserDetails;