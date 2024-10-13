import { Link } from "react-router-dom";
import FoodSvg from "../assets/FoodSvg.jpg";

function HomeCard({ name, image, category, price, loading, id }) {
  const handleImageError = (e) => {
    e.target.src = FoodSvg;
  };

  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px] min-h-[150px]">
      {name ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="w-40 h-40">
              <img src={image || FoodSvg} alt="foods" className="h-full w-full object-cover" onError={handleImageError} />
            </div>
            <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">{name}</h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>
            <p className="text-center font-medium">
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