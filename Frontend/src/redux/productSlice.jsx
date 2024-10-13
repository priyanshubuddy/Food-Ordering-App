import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const initialState = {
    productList: [],
    cartItem: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        setDataProduct : ( state, action ) => {
            state.productList = [...action.payload]
        },
        addCartItem : (state, action) => {
            const check = state.cartItem.some(el => el._id === action.payload._id)

            if(check) {
                toast("Item already in cart", {
                    position: "bottom-center",
                    style: {
                        background: "#333",
                        color: "#fff",
                        padding: "16px",
                        borderRadius: "8px",
                        textAlign: "center"
                    }
                });
            } else {
                toast(
                    <div>
                        <p>Item added to cart successfully</p>
                        <Link to="/cart" className="ml-2 text-blue-500 underline">Go to Cart</Link>
                    </div>,
                    {
                        position: "bottom-center",
                        style: {
                            background: "#333",
                            color: "#fff",
                            padding: "16px",
                            borderRadius: "8px",
                            textAlign: "center"
                        }
                    }
                );
                const total = action.payload.price
                state.cartItem = [...state.cartItem, {...action.payload, qty: 1, total: total}]
            }
        },
        deleteCartItem: (state, action) => {
            toast("One item deleted", {
                position: "bottom-center",
                style: {
                    background: "#333",
                    color: "#fff",
                    padding: "16px",
                    borderRadius: "8px",
                    textAlign: "center"
                }
            });
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            state.cartItem.splice(index, 1)
        },
        increaseQty : (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            const qtyInc = ++qty
            state.cartItem[index].qty = qtyInc

            const price = state.cartItem[index].price
            const total = price * qtyInc

            state.cartItem[index].total = total
        },
        decreaseQty : (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload)
            let qty = state.cartItem[index].qty
            if(qty > 1) {
                const qtyDec = --qty
                state.cartItem[index].qty = qtyDec

                const price = state.cartItem[index].price
                const total = price * qtyDec

                state.cartItem[index].total = total
            }
        }
    }
})

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions

export default productSlice.reducer