import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const productData = useSelector((state) => state.product.productList);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userData, navigate]);

  const getProductDetails = (productId) => {
    return productData.find(product => product._id === productId);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">Order ID: {order._id}</h3>
              <p>Status: {order.orderStatus}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Delivery Address: {order.deliveryAddress.address}</p>
              <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Products:</h4>
                <ul className="list-disc list-inside">
                  {order.products.map((product) => {
                    const productDetails = getProductDetails(product.productId);
                    return (
                      <li key={product._id}>
                        {productDetails ? (
                          <>
                            <span>{productDetails.name}</span> - 
                            <span> Quantity: {product.quantity}</span> - 
                            <span> Price: ₹{product.price}</span>
                          </>
                        ) : (
                          <span>Product details not available</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
