import { useSelector } from 'react-redux'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import offer from '../assets/offer2.png'

const Home = () => {
  const categoryData = useSelector((state) => state.product.allCategory);

  return (
    <section >
      <div className='container mx-auto p-4'>
        <img
          src={offer}
          alt="oferta relâmpago"
          className='w-full h-auto max-h-72 object-contain bg-[#1254d1] rounded-lg'
        />
      </div>

      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + 'categoryWiseProduct'}
            id={c?._id}
            name={c?.name}
          />
        )
      })}
    </section>
  )
}

export default Home