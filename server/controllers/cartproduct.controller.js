import CartProductModel from '../models/cartproduct.model.js';

export const AddItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: 'Produto e quantidade são obrigatórios.',
                error: true,
                success: false
            });
        }

        const existingCartItem = await CartProductModel.findOne({ userId, productId });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            const updatedItem = await existingCartItem.save();
            return res.json({
                message: 'Quantidade do item no carrinho atualizada com sucesso.',
                data: updatedItem,
                success: true,
                error: false
            });
        }
        

        const AddCartItem = new CartProductModel({ userId, productId, quantity });
        const saveCartItem = await AddCartItem.save()

        return res.json({
            message: 'Adicionado ao carrinho com sucesso.',
            data: saveCartItem,
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

export const GetItemsInCart = async (req, res) => {
    try {
        const userId = req.userId;

        const cartItems = await CartProductModel.find({ userId }).populate('productId');

        return res.json({
            data: cartItems,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const UpdateCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "ID do item do carrinho e quantidade são obrigatórios.",
                error: true,
                success: false
            });
        }

        const updatedItem = await CartProductModel.findOneAndUpdate(
            { _id: productId, userId },
            { quantity },
            { new: true }
        );

        return res.json({
            data: updatedItem,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
};


export const RemoveItemFromCart = async (req, res) => {
    try {

        const userId = req.userId;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "ID do item do carrinho é obrigatório.",
                error: true,
                success: false
            });
        }

        const deletedItem = await CartProductModel.findOneAndDelete({ _id: productId, userId });
        if (!deletedItem) {
            return res.status(400).json({
                message: "Item do carrinho não encontrado ou não pertence ao usuário.",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "Removido do carrinho com sucesso.",
            data: deletedItem,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}