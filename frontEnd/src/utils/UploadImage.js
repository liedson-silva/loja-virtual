import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        return error;
    };
};

export default uploadImage;
