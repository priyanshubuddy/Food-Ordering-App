import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/cartProduct'
import emptyCartImage from "../assets/empty.gif"

function Cart() {
    const productCartItem = useSelector((state) => state.product.cartItem)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState("");

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    const handlePaymentClick = () => {
        setIsModalOpen(true);
    };

    const handleSaveAndProceed = () => {
        // Logic for saving address and proceeding to payment
        setIsModalOpen(false);
        alert("Proceeding to payment...");
    };

    return (
        <>
            <div className='p-2 md:p-4'>
                <h2 className='text-lg md:text-2xl font-bold text-slate-600 mb-4'>Your Cart Items</h2>
                {productCartItem[0] ?
                    <div className="my-4 flex gap-6 flex-col md:flex-row">
                        {/* display cart items */}
                        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
                            {productCartItem.map(el => {
                                return (
                                    <CartProduct
                                        id={el._id}
                                        key={el._id} image={el.image}
                                        name={el.name}
                                        category={el.category}
                                        qty={el.qty}
                                        total={el.total}
                                        price={el.price}
                                    />
                                )
                            })}
                        </div>

                        {/* total cart item */}
                        <div className="w-full max-w-md ml-auto bg-white p-4 rounded-lg shadow-md">
                            <h2 className='bg-slate-600 text-white p-2 text-lg rounded-t-lg'>Summary</h2>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Qty: </p>
                                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Price</p>
                                <p className='ml-auto w-32 font-bold'><span className="text-blue-900">₹ </span>{totalPrice}</p>
                            </div>
                            <button
                                className='bg-blue-600 w-full text-lg font-bold py-2 text-white mt-4 rounded-lg hover:bg-blue-700 transition duration-300'
                                onClick={handlePaymentClick}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>

                    : <div className="flex w-full justify-center items-center flex-col">
                        <img src={emptyCartImage} alt="emptycart" className='w-full max-w-sm' />
                        <p className='text-slate-500 text-3xl font-bold mt-4'>Empty Cart</p>
                    </div>
                }
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Address:</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="4"
                            />
                        </div>
                        <h2 className='bg-slate-600 text-white p-2 text-lg rounded-t-lg'>Summary</h2>
                        <div className="flex w-full py-2 text-lg border-b">
                            <p>Total Qty: </p>
                            <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                        </div>
                        <div className="flex w-full py-2 text-lg border-b">
                            <p>Total Price</p>
                            <p className='ml-auto w-32 font-bold'><span className="text-blue-900">₹ </span>{totalPrice}</p>
                        </div>
                        <button
                            className='bg-blue-600 w-full text-lg font-bold py-2 text-white mt-4 rounded-lg hover:bg-blue-700 transition duration-300'
                            onClick={handleSaveAndProceed}
                        >
                            Save and Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart