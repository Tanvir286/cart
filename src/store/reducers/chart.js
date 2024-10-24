import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    proceedToCheckout: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload;
           
            state.cartItems = [{ ...course, quantity: 1 }];
          
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
                const item = state.cartItems[itemIndex];
                state.cartItems.splice(itemIndex, 1); 
            }    
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity = quantity; 
            }
            // Recalculate total price
            state.totalPrice = state.cartItems.reduce((total, item) => total + item.discount_price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0; 
        },
        proceedToCheckout(state, action) {
            state.proceedToCheckout = action.payload; 
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart ,proceedToCheckout } = cartSlice.actions;
export default cartSlice.reducer;
