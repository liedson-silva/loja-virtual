import AddressModel from "../models/address.model.js";

export const CreateAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { address_line, city, state, pincode, country, mobile } = req.body;
        if (!address_line || !city || !state || !pincode || !country || !mobile) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            })
        }

        const address = new AddressModel({
            address_line: address_line,
            city: city,
            state: state,
            pincode: pincode,
            country: country,
            mobile: mobile,
            userId: userId,
        })
        const saveAddress = await address.save()

        return res.json({
            message: "Endereço salvo com sucesso!",
            success: true, error: false, data: saveAddress
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        })
    }
};

export const GetAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const address = await AddressModel.find({ userId });

        return res.json({
            data: address,
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        })
    }
};

export const DeleteAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId } = req.body;
        if (!addressId) {
            return res.status(400).json({
                message: "Id do endereço é obrigatório.",
                error: true, success: false
            });
        };

        const deleteAddress = await AddressModel.findOneAndDelete({ _id: addressId, userId })
        if (!deleteAddress) {
            return res.status(400).json({
                message: "Endereço não encontrado ou não pertence ao usuário.",
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Endereço removido com sucesso!',
            data: deleteAddress,
            success: true, error: false
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        })
    }
};