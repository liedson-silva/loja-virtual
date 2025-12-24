import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [ProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      };
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    };
  };

  return (
    <div>
      <div className='w-20 h-20 bg-blue-50 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className='w-full h-full' />
        ) : (
          <FaRegUserCircle />
        )}
      </div>
      <button className='font-semibold min-w-16 border border-primary-100 bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 text-white hover:opacity-90 py-1 px-4 rounded-full mt-3' onClick={() => setProfileAvatarEdit(!ProfileAvatarEdit)}>
        Editar
      </button>
      {ProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}
      <form onSubmit={handleSubmit} className='my-4 grid gap-4'>
        <div className='grid'>
          <label htmlFor='name'>Nome: </label>
          <input type="text"
            id='name'
            placeholder='Digite seu nome:'
            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
            value={userData.name}
            name='name'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor='email'>Email: </label>
          <input type="email"
            id='email'
            placeholder='Digite seu email:'
            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
            value={userData.email}
            name='email'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor='mobile'>Telefone: </label>
          <input type="tel"
            id='mobile'
            placeholder='Digite seu telefone:'
            className='py-2 bg-blue-50 outline-none border rounded hover:border-primary-100'
            value={userData.mobile}
            name='mobile'
            onChange={handleOnChange}
            required
          />
        </div>
        <button className='font-semibold min-w-16 border border-primary-100 bg-gradient-to-r from-tertiary-100 via-secondary-100 to-primary-100 text-white hover:opacity-90 py-1 px-4 rounded-full mt-3'>
          {loading ? "Carregando..." : "Salvar"}
        </button>
      </form>
    </div>
  )
}

export default Profile