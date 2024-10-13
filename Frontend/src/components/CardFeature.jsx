import { Link } from "react-router-dom"
import { addCartItem } from "../redux/productSlice"
import { useDispatch } from "react-redux"

function CardFeature({image, name, price, category, loading, id}) {
  const dispatch = useDispatch()

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  };

  return (
    <div className='w-full min-w-[250px] max-w-[250px] bg-white hover:shadow-xl drop-shadow-xl py-6 px-5 cursor-pointer flex flex-col rounded-lg transition-transform transform hover:scale-105'>
      {image ? 
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top: "0", behavior: "smooth"})}>
            <div className="h-40 flex justify-center items-center overflow-hidden rounded-lg">
                <img src={image} alt="product" className='h-full w-full object-cover'/>
            </div>
            <h3 className="font-semibold text-slate-700 capitalize text-lg mt-4 text-center">{name}</h3>
            <p className="text-slate-500 font-medium text-center">{category}</p>
            <p className="font-medium text-center text-xl mt-2"> <span className="text-slate-900">₹ </span><span>{price}</span></p>
          </Link>
            <button 
              className='bg-slate-600 py-2 mt-4 rounded text-white hover:bg-slate-700 w-full font-semibold transition-colors duration-300' 
              onClick={handleAddCartProduct}
            >
            Add to Cart
            </button>
        </>
        : <div className="min-h-[150px] flex justify-center items-center">
            <p>{loading}</p>
          </div>
        }
    </div>
  )
}

export default CardFeature