import { Link } from "react-router-dom";
import FoodSvg from "../assets/FoodSvg.jpg";

function HomeCard({ name, image, category, price, loading, id }) {
  const handleImageError = (e) => {
    e.target.src = FoodSvg;
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg w-[200px] min-h-[250px] transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {name ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="w-full h-40 overflow-hidden rounded-lg">
              <img src={image || FoodSvg} alt="foods" className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" onError={handleImageError} />
            </div>
            <h3 className="font-semibold text-slate-700 text-center capitalize text-xl mt-4">{name}</h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>
            <p className="text-center font-medium text-lg mt-2">
              <span className="text-blue-900">₹ </span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}

export default HomeCard;