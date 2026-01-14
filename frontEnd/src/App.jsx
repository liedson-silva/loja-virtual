import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import fetchUserDetails from './utils/fetchUserDetails'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { setAllCategory, setAllSubCategory } from './store/productSlice'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'

function App() {
  const dispatch = useDispatch();
  
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);

  return (
    <>
      <main className='min-h-[95vh]'>
        <Header />
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
