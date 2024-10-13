import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/cartProduct'
import emptyCartImage from "../assets/empty.gif"

function Cart() {
    const userData = useSelector((state) => state.user);
    const productCartItem = useSelector((state) => state.product.cartItem)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    const handlePaymentClick = () => {
        if (!userData) {
            setIsLoginModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleSaveAndProceed = () => {
        // Logic for saving address and proceeding to payment
        setIsModalOpen(false);
        alert("Proceeding to payment...");
    };

    return (
        <>
            <div className='p-4 md:p-8' style={{ minHeight: '80vh' }}>
                <h2 className='text-2xl md:text-4xl font-bold text-slate-700 mb-6'>Your Cart Items</h2>
                {productCartItem[0] ?
                    <div className="my-6 flex gap-8 flex-col md:flex-row">
                        {/* display cart items */}
                        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
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
                        <div className="w-full max-w-md ml-auto bg-white p-6 rounded-lg shadow-lg">
                            <h2 className='bg-blue-600 text-white p-4 text-lg rounded-t-lg'>Summary</h2>
                            <div className="flex w-full py-3 text-lg border-b">
                                <p>Total Qty: </p>
                                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                            </div>
                            <div className="flex w-full py-3 text-lg border-b">
                                <p>Total Price</p>
                                <p className='ml-auto w-32 font-bold'><span className="text-blue-900">₹ </span>{totalPrice}</p>
                            </div>
                            <button
                                className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white mt-6 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                        <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                        <div className="flex gap-5">
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Name:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Number:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    value={number ? `+91 ${number}` : ''}
                                    onChange={(e) => setNumber(e.target.value.replace('+91 ', ''))}
                                    placeholder="+91"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Address:</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="4"
                            />
                        </div>
                        <h2 className='bg-blue-600 text-white p-4 text-lg rounded-t-lg'>Summary</h2>
                        <div className="flex w-full py-3 text-lg border-b">
                            <p>Total Qty: </p>
                            <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                        </div>
                        <div className="flex w-full py-3 text-lg border-b">
                            <p>Total Price</p>
                            <p className='ml-auto w-32 font-bold'><span className="text-blue-900">₹ </span>{totalPrice}</p>
                        </div>
                        <button
                            className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white mt-6 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                            onClick={handleSaveAndProceed}
                        >
                            Save and Proceed to Payment
                        </button>
                    </div>
                </div>
            )}

            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                        <h2 className="text-2xl font-bold mb-6">Login or Signup</h2>
                        <p className="mb-6">Please login or signup to proceed with the payment.</p>
                        <button
                            className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white mt-6 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                            onClick={() => setIsLoginModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart