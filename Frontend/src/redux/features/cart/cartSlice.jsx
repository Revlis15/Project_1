import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            if(!existingItem){
                state.cartItems.push({...action.payload, quantity: 1})
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item added to cart",
                    showConfirmButton: false,
                    timer: 1000
                  });
            } else if(existingItem){
                Swal.fire({
                    title: "Item already in cart",
                    text: "Do you want to increase the quantity?",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm"
                  })
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

// export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer