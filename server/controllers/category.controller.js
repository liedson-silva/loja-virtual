import CategoryModel from '../models/category.model.js'
import SubCategoryModel from '../models/category.model.js'

export const addCategoryController = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            });
        };

        const addCategory = new CategoryModel({
            name, image
        });

        const saveCategory = await addCategory.save()
        if (!saveCategory) {
            return res.status(400).json({
                message: "Não foi possível salvar a categoria.",
                error: true, success: false
            });
        };

        return res.json({
            message: "Categoria adicionada com sucesso!",
            success: true, error: false, data: saveCategory
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export const getCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find().sort({ createdAt: -1 });

        return res.json({
            success: true,
            error: false,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export const updateCategoryController = async (req, res) => {
    try {
        const { _id, name, image } = req.body;

        const update = await CategoryModel.updateOne({
            _id: _id
        }, {
            name, image
        })

        return res.json({
            message: "Categoria atualizada com sucesso!",
            success: true,
            error: false,
            data: update
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};

export const deleteCategoryController = async (req, res) => {
    try {
        const { _id } = req.body;

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                $in: [_id]
            }
        }).countDocuments();

        const checkProduct = await CategoryModel.find({
            category: {
                $in: [_id]
            }
        }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return res.status(400).json({
                message: "Não é possível deletar esta categoria, existem subcategorias ou produtos vinculados a ela.",
                error: true,
                success: false
            });
        };

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

        return res.json({
            message: "Categoria deletada com sucesso!",
            success: true,
            error: false,
            data: deleteCategory
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    };
};