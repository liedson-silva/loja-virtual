import uploadImageClodinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Arquivo de imagem não enviado",
                success: false,
                error: true
            });
        }

        const uploadImage = await uploadImageClodinary(file);

        return res.json({
            message: "Imagem enviada com sucesso!",
            success: true,
            error: false,
            data: uploadImage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export default uploadImageController;
