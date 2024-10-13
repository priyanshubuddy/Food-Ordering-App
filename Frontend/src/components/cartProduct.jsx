import { TbPlus, TbMinus } from "react-icons/tb"
import { AiFillDelete } from "react-icons/ai";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";
import { useDispatch } from "react-redux";

function CartProduct({id, name, image, category, qty, total, price}) {
    const dispatch = useDispatch()

    return (
        <div className="bg-white p-4 flex flex-col md:flex-row gap-6 rounded-lg shadow-md border border-gray-200">
            <div className='bg-gray-100 p-4 rounded-lg overflow-hidden flex-shrink-0 w-full md:w-40 h-40'>
                <img src={image} alt="foods" className='w-full h-full object-cover rounded-md'/>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 capitalize text-lg md:text-xl">{name}</h3>
                    <div className="cursor-pointer text-gray-600 hover:text-red-600 transition duration-300" onClick={() => dispatch(deleteCartItem(id))}>
                        <AiFillDelete size={24} />
                    </div>
                </div>
                <p className="text-gray-500 font-medium">{category}</p>
                <p className="font-bold text-lg text-gray-800"> 
                    <span className="text-blue-600">₹ </span>
                    <span>{price}</span>
                </p>

                <div className="flex flex-col md:flex-row justify-between items-center mt-2 gap-4 md:gap-0">

                    <div className='flex gap-3 items-center'>
                        <button 
                            className='bg-blue-500 py-2 px-3 rounded-full text-white hover:bg-blue-600 transition duration-300' 
                            onClick={() => dispatch(increaseQty(id))}><TbPlus size={20} 
                        />
                        </button>
                        <p className="font-semibold text-lg">{qty}</p>
                        <button 
                            className='bg-blue-500 py-2 px-3 rounded-full text-white hover:bg-blue-600 transition duration-300' 
                            onClick={() => dispatch(decreaseQty(id))}><TbMinus size={20} 
                        />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 font-bold text-gray-800">
                        <p>Total: </p>
                        <p><span className="text-blue-600">₹ </span>{total}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartProduct