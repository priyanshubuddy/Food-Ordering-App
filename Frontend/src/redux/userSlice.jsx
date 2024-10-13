import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            return {
                _id: action.payload.data._id,
                firstName: action.payload.data.firstName,
                lastName: action.payload.data.lastName,
                email: action.payload.data.email,
                image: action.payload.data.image,
            };
        },
        logoutRedux: (state, action) => {
            return null;
        }
    }
})

export const { loginRedux, logoutRedux } = userSlice.actions
export default userSlice.reducer