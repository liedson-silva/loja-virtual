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