import { useSelector } from "react-redux"
import HomeCard from "../components/HomeCard"
import CardFeature from "../components/CardFeature"
import { GrPrevious, GrNext } from "react-icons/gr";

import { useEffect, useRef, useState } from "react";
import FilterProduct from "../components/FilterProduct";
import AllProducts from "../components/AllProducts";

function Home() {
  const productData = useSelector((state) => state.product.productList)

  const homeProductCartList = productData.slice(1, 5)
  const homeProductCartListVegetables = productData.filter(el => el.category === "vegetable", [])

  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 300
  }

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 300
  }

  return (
    <div className="p-3 md:p-6 mt-1">
      <div className="md:flex justify-center items-center flex-col gap-4 py-2">

        <div className="w-30 md:w-4/5">
          <div className="flex gap-3 bg-gradient-to-r from-green-400 to-blue-500 w-36 px-2 items-center rounded-full m-auto shadow-lg">
            <p className="text-sm font-medium text-white">Bike Delivery</p>
            <img
              src="https://www.svgrepo.com/download/70289/bike.svg"
              alt="bike delivery"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3 text-center text-gray-800">Satyam Fast Food <br /><span className="text-gray-600">Order anytime, anywhere!</span></h2>
          <p className="py-3 text-base max-w-5xl m-auto text-center text-gray-700">Our food delivery app offers a wide range of products, including fresh fruits, vegetables, ice cream, sandwiches, and desserts. With just a few taps, users can conveniently order their groceries and have them delivered right to their doorstep. Whether you're at home or on the go, Satyam Fast Food is here to make your life easier.</p>
          <div className="flex items-center justify-center">
            <button className="font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:from-green-500 hover:to-blue-600 shadow-lg">Order Now</button>
          </div>
        </div>

        <div className="md:w-4/5 text-center flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0] ? homeProductCartList.map(el => {
            return (
              <HomeCard
                key={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
                id={el._id}
              />
            )
          })
            : loadingArray.map((el, index) => {
              return (
                <HomeCard
                  key={index + "loading"}
                  loading={"Loading..."}
                />
              )
            })
          }
        </div>
      </div>

      <div className="mt-12">
        <div className="flex w-full items-center mb-6">
          <div className="text-center mb-4 w-full">
            <h2 className="font-extrabold text-4xl text-gray-900">Fresh Vegetables</h2>
            <p className="text-lg text-gray-700 mt-2">Discover our selection of fresh vegetables, handpicked to ensure the highest quality and taste. Perfect for your healthy meals and recipes.</p>
          </div>

        </div>
        <div className="relative flex gap-4 items-center justify-center">
          <div className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth transition-all p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-2xl" ref={slideProductRef}>
            {homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
              return (
                <CardFeature
                  key={el._id + "vegetables"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              )
            })
              : loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index + "cartLoading"} />)
            }
          </div>
          <button onClick={preveProduct} className="absolute left-0 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-2xl p-3 rounded-full shadow-lg transition-transform transform hover:scale-125 h-12 flex items-center justify-center"><GrPrevious /></button>
          <button onClick={nextProduct} className="absolute right-0 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white text-2xl p-3 rounded-full shadow-lg transition-transform transform hover:scale-125 h-12 flex items-center justify-center"><GrNext /></button>
        </div>
      </div>
      <AllProducts heading="Menu" description="Explore our diverse menu featuring a variety of delicious and healthy options to satisfy your cravings." />
    </div>
  )
}

export default Home