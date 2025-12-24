import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from "../store/userSlice";
import { toast } from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';
import isAdmin from "../utils/isAdmin"

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            });
            if (response.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                window.history.back();
            };
        } catch (error) {
            AxiosToastError(error);
        };
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    }

    return (
        <div>
            <div className='font-semibold'>Minha conta</div>
            <div className='text-sm flex items-center gap-1'>
                {user.name || user.mobile} {" "}
                <span className='text-xs text-gray-500'>
                    {user.role === 'ADMIN' ? '[Admin]' : ""}
                </span>
                <Link onClick={handleClose} to={'/dashboard/profile'} className='hover:text-primary-100'>
                    <HiOutlineExternalLink size={16} />
                </Link>
            </div>
            <hr className='my-2' />
            <div className='grid gap-2'>
                {isAdmin(user.role) && (
                    <>
                        <Link
                            onClick={handleClose}
                            to={"/dashboard/category"}
                            className='hover:text-primary-100'>
                            Categoria
                        </Link>
                        <Link
                            onClick={handleClose}
                            to={"/dashboard/sub-category"}
                            className='hover:text-primary-100'>
                            Sub Categoria
                        </Link>
                        <Link
                            onClick={handleClose}
                            to={"/dashboard/upload-product"}
                            className='hover:text-primary-100'>
                            Carregar Produto
                        </Link>
                        <Link
                            onClick={handleClose}
                            to={"/dashboard/product-admin"}
                            className='hover:text-primary-100'>
                            Produto
                        </Link>
                    </>
                )}
                <Link
                    onClick={handleClose}
                    to={"/dashboard/my-orders"}
                    className='hover:text-primary-100'>
                    Meus Pedidos
                </Link>
                <Link
                    onClick={handleClose}
                    to={"/dashboard/address"}
                    className='hover:text-primary-100'>
                    Endereço
                </Link>
                <button
                    onClick={handleLogout}
                    className='bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 text-white text-center rounded-md font-semibold hover:opacity-90'>
                    Sair
                </button>
            </div>
        </div>
    )
}

export default UserMenu