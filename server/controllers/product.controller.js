import ProductModel from '../models/product.model.js';

export const CreateProductController = async (req, res) => {
    try {
        const {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        } = req.body;
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !description) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true,
                success: false
            });
        }

        const produc = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        });

        const savedProduct = await produc.save();
        return res.json({
            message: "Produto criado com sucesso.",
            data: savedProduct,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const GetProductController = async (req, res) => {
    try {
        let { page, limit, search } = req.body;

        if (!page) page = 1;
        if (!limit) limit = 10;

        const query = search ? {
            $text: {
                $search: search
            }
        } : {};

        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
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
    }
};

export const GetProductByCategoryController = async (req, res) => {
    try {
        let { id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "ID da categoria é obrigatório.",
                error: true,
                success: false
            });
        }

        const product = await ProductModel.find({
            category: { $in: id }
        }).limit(15)

        return res.json({
            data: product,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const GetProductByCategoryAndSubCategoryController = async (req, res) => {
    try {
        let { categoryId, subCategoryId, page, limit } = req.body;

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "ID da categoria e subcategoria é obrigatório.",
                error: true,
                success: false
            });
        }


        if (!page) page = 1;
        if (!limit) limit = 10;

        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }
        }

        const skip = (page - 1) * limit;

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const GetProductDetailsController = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await ProductModel.find({ _id: productId })

        return res.json({
            data: product,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const UpdateProductDetailsController = async (req, res) => {
    try {
        let { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "ID do produto é obrigatório.",
                error: true,
                success: false
            });
        }

        const updateProduct = await ProductModel.updateOne({ _id: _id }, {
            ...req.body
        })

        return res.json({
            message: "Detalhes do produto atualizados com sucesso.",
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const DeleteProductDetailsController = async (req, res) => {
    try {
        let { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "ID do produto é obrigatório.",
                error: true,
                success: false
            });
        }

        const deleteProduct = await ProductModel.deleteOne({ _id: _id })

        return res.json({
            message: "Produto deletado com sucesso.",
            data: deleteProduct,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export const SearchProductController = async (req, res) => {
    try {
        let { search, page, limit } = req.body;

        if (!page) page = 1;
        if (!limit) limit = 10;

        const query = search ? {
            $text: {
                $search: search
            }
        } : {};

        const skip = (page - 1) * limit;

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return res.json({
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
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
    }
};