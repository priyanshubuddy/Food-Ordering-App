import { Link } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  
  const userData = useSelector((state) => state.user);
  const cartItemNumber = useSelector((state) => state.product.cartItem);
  const dispatch = useDispatch();
  
  const handleShowMenu = () => {
    setShowMenu(prevState => !prevState);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };

  return (
    <header className="fixed w-full h-16 shadow-lg px-4 md:px-8 z-50 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12 flex items-center md:text-lg font-bold font-sans text-white">
            <h1 className="text-2xl">Satyam <span className="font-bold text-yellow-300">Fast Food</span></h1>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex text-white">
            <Link to={""} className="hover:text-yellow-300 transition duration-300">Home</Link>
            <Link to={"about"} className="hover:text-yellow-300 transition duration-300">About</Link>
            <Link to={"contact"} className="hover:text-yellow-300 transition duration-300">Contact</Link>
          </nav>
          <div className="relative cursor-pointer text-white">
            <Link to={"cart"} className="flex items-center">
              <CiShoppingCart className="text-3xl hover:text-yellow-300 transition duration-300" />
              {cartItemNumber.length > 0 && (
                <div className="absolute -top-2 -right-2 text-white bg-red-600 h-5 w-5 rounded-full text-xs text-center flex justify-center items-center animate-bounce">
                  {cartItemNumber.length}
                </div>
              )}
            </Link>
          </div>
          <div className="text-2xl" onClick={handleShowMenu}>
            <div className="cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md border-2 border-white bg-gray-200 flex items-center justify-center">
              {userData.image ? <img src={userData.image} alt="user" className="h-full w-full object-cover" /> : <CiUser className="text-2xl text-gray-500" />}
            </div>
            {showMenu && (
              <div className="absolute mt-2 right-2 bg-white py-2 px-2 shadow-lg drop-shadow-md text-base flex flex-col min-w-[150px] text-center rounded-lg">
                {userData.email === 'priyanshudubey.dev@gmail.com' && (
                  <Link to={"newproduct"} className="whitespace-nowrap cursor-pointer px-2 py-2 hover:bg-gray-200 transition duration-300">New product</Link>
                )}
                {userData.image ? (
                  <p className="cursor-pointer text-white bg-red-500 px-2 py-2 rounded-lg hover:bg-red-600 transition duration-300" onClick={handleLogout}>
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2 py-2 hover:bg-gray-200 transition duration-300">Login</Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="hover:text-slate-700 px-2 py-2 hover:bg-gray-200 transition duration-300">Home</Link>
                  <Link to={"about"} className="hover:text-slate-700 px-2 py-2 hover:bg-gray-200 transition duration-300">About</Link>
                  <Link to={"contact"} className="hover:text-slate-700 px-2 py-2 hover:bg-gray-200 transition duration-300">Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;