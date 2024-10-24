// src/components/Cart.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, proceedToCheckout } from '../../store/reducers/chart'; // Ensure the path is correct
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {

    // state
    const cart = useSelector((state) => state.cart);  
    const dispatch = useDispatch();
    const navigate = useNavigate();


    // handlers
    const handleQuantityChange = (id, quantity) => {
        if (quantity >= 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    // handlers
    const handleCheckout = () => {
        toast.success("Proceeding to checkout!");
        dispatch(proceedToCheckout(true)); 
        navigate('/checkout'); 
    };

    return (
        <div className="m-mt_16px">
            <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">Cart</h1>
            <div className="pt-p_16px">
                <div className="lg:flex items-start gap-3">
                    <div className="w-full lg:w-[58%] bg-white border-2">
                        <table className="overflow-x-auto w-full">
                            <thead>
                                <tr className="border-b-4 border-gray-300">
                                    <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">Course</th>
                                    <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
                                    <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                                    <th className="text-[14.4px] font-bold p-[7px] text-black">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-x-auto">
                                {cart.cartItems.length === 0 ? (
                                 <tr>
                                    <td colSpan="4" className="text-center p-4">
                                  <div className="flex flex-col items-center justify-center py-10">
                                      <img
                                        src="https://cdn-icons-png.freepik.com/512/2037/2037457.png" 
                                        alt="Empty Cart"
                                        className="w-24 h-24 mb-4" 
                                        />
                                      <h2 className="text-xl font-bold text-gray-600">Your cart is empty</h2>
                                      <p className="text-gray-500">Looks like you haven't added anything yet.</p>
                                      <button
                                         className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                         onClick={() => navigate('/course')} 
                                        >
                                         Shop Now
                                       </button>
                                    </div>
                                    </td>
                                  </tr>
                                ) 
                                : (
                                    cart.cartItems.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-300">
                                            <td>
                                                <div className="flex items-center justify-center">
                                                    <div className="w-[20%] text-center flex items-center justify-center">
                                                        <RiDeleteBin5Line
                                                            className="text-xl hover:text-red-500 cursor-pointer"
                                                            onClick={() => dispatch(removeFromCart(item.id))}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                                                        <img className="h-[40px] w-[70px]" src={item.photo} alt={item.course_name} />
                                                        <p className="text-[14.4px] px-[7px] text-center">{item.course_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">Tk {item.discount_price}</p>
                                            </td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <button
                                                        className="px-4 w-[30px] font-bold my-1.5"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className="font-bold w-[30px] lg:w-[60px] px-2 text-center mx-auto h-full"
                                                        readOnly
                                                    />
                                                    <button
                                                        className="px-4 w-[30px] font-bold my-1.5"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                    Tk {item.discount_price * item.quantity} 
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                     {/* Cart Summary */}
                     

                    <div className="lg:w-[41%] bg-white border-2">
                        <div className="px-[30px]">
                            <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                Cart Summary
                            </h2>
                            <div className="py-3 flex justify-between border-b border-gray-300">
                                <p className="text-black font-bold">Total Price</p>
                                <p className="text-black font-bold">
                                    Tk {cart.totalPrice} {/* Display total price */}
                                </p>
                            </div>
                            <button
                              className={`font-medium text-black mb-2 border-2 duration-300 py-2 px-4 block text-center mx-auto w-full ${
                              cart.totalPrice === 0 ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-[#D2C5A2]'
                               }`}
                              onClick={handleCheckout} // Update to use the new function
                              disabled={cart.totalPrice === 0} >
                              PROCEED TO CHECKOUT
                              </button>
                        </div>
                    </div>

                     {/* Cart Summary */}
                </div>
            </div>
        </div>
    );
};

export default Cart;
