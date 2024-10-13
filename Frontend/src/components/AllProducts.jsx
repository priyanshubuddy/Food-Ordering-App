import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';
import FoodSvg from '../assets/FoodSvg.jpg';

function AllProducts({ heading }) {
  const productData = useSelector((state) => state?.product?.productList);

  const categoryList = [...new Set(productData?.map((el) => el?.category))];

  const [filterBy, setFilterBy] = useState('');
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData?.filter(
      (el) => el?.category?.toLowerCase() === category?.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10)?.fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList?.map((el) => {
            return (
              <FilterProduct
                category={el}
                onClick={() => handleFilterProduct(el)}
                key={el}
                isActive={el?.toLowerCase() === filterBy?.toLowerCase()}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center my-4">
        {dataFilter[0]
          ? dataFilter?.map((el) => {
              return (
                <CardFeature
                  key={el?._id}
                  id={el?._id}
                  image={el?.image || FoodSvg}
                  name={el?.name}
                  category={el?.category}
                  price={el?.price}
                  imageStyle={{ width: '200px', height: '200px' }}
                />
              );
            })
          : loadingArrayFeature?.map((el, index) => (
              <CardFeature
                loading="Loading..."
                key={index + 'allProduct'}
                imageStyle={{ width: '200px', height: '200px' }}
              />
            ))}
      </div>
    </div>
  );
}

export default AllProducts;