import SubCategoryModel from '../models/subCategory.model.js'

export const AddSubCategoryController = async (req, res) => {
    try {
        const { name, image, category } = req.body;
        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true,
                success: false
            });
        };

        const payload = { name, image, category };
        const createSubCategory = new SubCategoryModel(payload);
        const save = await createSubCategory.save();

        return res.json({
            message: "Sub categoria adicionada com sucesso!",
            data: save,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export const getSubCategoryController = async (req, res) => {
    try {
        const data = await SubCategoryModel.find().sort({ createAt: -1 }).populate('category');

        return res.json({
            data: data,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};