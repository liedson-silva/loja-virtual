import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { updateAvatar } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from 'react-icons/io5'

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleuploadAvatarImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        };
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { data: responseData } = response;
            dispatch(updateAvatar(responseData.data.avatar));
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        };
    };

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-gradient-to-r from-blue-300 via-blue-150 to-blue-50 max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 block w-fit ml-auto'>
                    <IoClose />
                </button>
                <div className='w-20 h-20 bg-blue-50 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                    {user.avatar ? (
                        <img alt={user.name} src={user.avatar} className='w-full h-full' />
                    ) : (
                        <FaRegUserCircle />
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">
                        <div className='font-semibold cursor-pointer min-w-16 border border-primary-100 bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 text-white hover:opacity-90 py-1 px-4 rounded-full mt-3'>
                            {loading ? "Carregando..." : "Carregar Avatar"}
                        </div>
                    </label>
                    <input onChange={handleuploadAvatarImage} type="file" id='uploadProfile' className='hidden' />
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit