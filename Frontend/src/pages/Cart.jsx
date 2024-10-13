import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartProduct from '../components/cartProduct'
import emptyCartImage from "../assets/empty.gif"
import { clearCart } from '../redux/productSlice'

function Cart() {
    const userData = useSelector((state) => state.user);
    const productCartItem = useSelector((state) => state.product.cartItem)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isPaymentScreenOpen, setIsPaymentScreenOpen] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(null);
    const [paymentMessage, setPaymentMessage] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    const handlePaymentClick = () => {
        if (!userData) {
            setIsLoginModalOpen(true);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleSaveAndProceed = async () => {
        setIsModalOpen(false);
        setIsPaymentScreenOpen(true);
    };

    const handlePayment = async () => {
        const orderData = {
            userId: userData._id,
            products: productCartItem.map(item => ({
                productId: item._id,
                quantity: item.qty,
                price: item.price
            })),
            totalAmount: totalPrice,
            deliveryAddress: {
                name: name,
                number: number,
                address: address
            }
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/createOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            setPaymentMessage(data.message);
            setIsPaymentSuccess(true);
            dispatch(clearCart());
        } catch (error) {
            console.error('Error creating order:', error);
            if (error.message === "Duplicate order detected") {
                setPaymentMessage("Duplicate order detected. Please check your orders.");
            } else {
                setPaymentMessage(error.message || 'There was an error processing your payment. Please try again.');
            }
            setIsPaymentSuccess(false);
        } finally {
            setIsPaymentScreenOpen(false);
        }
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
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-110" onClick={(e) => e.stopPropagation()}>
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
                                    onChange={(e) => {
                                        const input = e.target.value.replace('+91 ', '');
                                        if (/^\d{0,10}$/.test(input)) {
                                            setNumber(input);
                                        }
                                    }}
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
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center" onClick={() => setIsLoginModalOpen(false)}>
                    <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={() => setIsLoginModalOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16L16 8M8 8l8 8" />
                            </svg>
                        </button>
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login or Signup</h2>
                        <p className="mb-6 text-gray-600">Please login or signup to proceed with the payment.</p>
                        <div className="flex gap-4">
                            <button
                                className='bg-gradient-to-r from-green-500 to-blue-600 w-full text-lg font-bold py-3 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition duration-300 shadow-md'
                                onClick={() => window.location.href = '/login'}
                            >
                                Login
                            </button>
                            <button
                                className='bg-gradient-to-r from-green-500 to-blue-600 w-full text-lg font-bold py-3 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition duration-300 shadow-md'
                                onClick={() => window.location.href = '/signup'}
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPaymentScreenOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center" onClick={() => setIsPaymentScreenOpen(false)}>
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-96" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                        <div className="flex flex-col gap-4 mb-6">
                            <button
                                className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                                onClick={handlePayment}
                            >
                                Pay with Credit Card
                            </button>
                            <button
                                className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                                onClick={handlePayment}
                            >
                                Pay with Debit Card
                            </button>
                            <button
                                className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                                onClick={handlePayment}
                            >
                                Pay with UPI
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isPaymentSuccess !== null && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">{isPaymentSuccess ? "Payment Confirmation" : "Payment Failed"}</h2>
                            <p className="mb-6">{paymentMessage}</p>
                            <button
                                className='bg-gradient-to-r from-green-400 to-blue-500 w-full text-lg font-bold py-3 text-white mt-6 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300'
                                onClick={() => setIsPaymentSuccess(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart