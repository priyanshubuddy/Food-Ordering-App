import { CiUser } from "react-icons/ci";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve)=>{
        return{
          ...preve,
          image : data
        } 
    })
  }

  const handleSubmit = async(e) =>  {
    e.preventDefault()
    const {firstName, email, password, confirmPassword} = data;
    if (firstName && email && password && confirmPassword) {
      if(password === confirmPassword) {
        const fetchData = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
          method: "POST",
          headers: {
            "content-type" : "application/json" 
          },
          body: JSON.stringify(data)
        })

        const dataRes = await fetchData.json()
        console.log(dataRes )
        // alert(dataRes.message)
        toast(dataRes.message)
        if(dataRes.message){
          navigate("/login")
        }
      }else {
        alert("incorrect")
      }
    }else{
      alert("required")
    }
  }

  return (
    <div className="min- flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-2">
            <img src={data.image ? data.image : loginSignupImage} className="w-full h-full object-cover" />
          </div>
          <label htmlFor="profileImage" className="bg-indigo-600 text-white rounded-full px-2 py-1 cursor-pointer hover:bg-indigo-700 transition duration-300 ease-in-out">
            <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
            Upload Image
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name:</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={data.firstName}
                onChange={handleOnChange}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name:</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={data.lastName}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                id="password" 
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={data.password}
                onChange={handleOnChange}
              />
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" 
                id="confirmPassword" 
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={data.confirmPassword}
                onChange={handleOnChange}
              />
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
