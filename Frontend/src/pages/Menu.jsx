import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AllProducts from '../components/AllProducts'
import { addCartItem } from '../redux/productSlice'

function Menu() {
  const { filterby } = useParams()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList)
  console.log(productData, 'productData');

  console.log(filterby, 'filterby')
  const productDisplay = productData.find(el => el._id === filterby)

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay))
  };

  if (!productDisplay) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Product Not Found</h1>
        <p className="text-lg text-slate-600 mb-4">Sorry, the product you are looking for does not exist.</p>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className='p-4 md:p-8 bg-gray-100 min-h-screen'>
      <div className="w-full max-w-6xl m-auto md:flex bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-hidden max-w-sm w-full p-5 flex justify-center items-center">
          <img src={productDisplay?.image} alt="foods" className='hover:scale-105 transition-transform duration-300 rounded-lg shadow-md object-cover w-full h-full'/>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <h3 className="font-semibold text-slate-800 capitalize text-2xl md:text-4xl">{productDisplay.name}</h3>
          <p className="text-slate-600 font-medium text-xl md:text-2xl">{productDisplay.category}</p>
          <p className="font-bold text-xl md:text-2xl"> <span className="text-blue-900">₹ </span><span>{productDisplay.price}</span></p>
          <div className='flex gap-4'>
            <button className='bg-blue-500 py-2 px-4 rounded text-white hover:bg-blue-600 transition duration-300 min-w-[100px]'>Buy</button>
            <button className='bg-green-500 py-2 px-4 rounded text-white hover:bg-green-600 transition duration-300 min-w-[100px]' onClick={handleAddCartProduct}>Add to Cart</button>
          </div>
          <div className="text-slate-700 font-medium mt-4">
            <p className="text-lg">Description: </p>
            <p className="text-base">{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProducts heading="Related Products"/>
    </div>
  )
}

export default Menu