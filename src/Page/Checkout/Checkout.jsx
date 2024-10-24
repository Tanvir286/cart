
import React, { useState,useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeValue } from '../../store/reducers/local';
import { clearCart } from '../../store/reducers/chart';
import axios from 'axios'; 

import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Checkout = () => {

    /*=========state===========*/
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
   
    

    /*=========photo===========*/
    const [photo, setPhoto] = useState(null);


    /*==========formDara==========*/
    const [formData, setFormData] = useState({
        name: '',
        photo: cart?.cartItems[0]?.photo || '',
        course_id: '',
        admission_date: new Date().toISOString().split('T')[0],
        father_name: '',
        father_phone_no: '',
        school_collage_name: '',
        job_title: '',
        email: '',
        gender: '',
        present_address: '',
        permanent_address: '',
        nid_no: '',
        phone_no: '',
        local_guardian_name: '',
        local_guardian_phone_no: '',
        date_of_birth: '',
        blood_group: '',
        course_fee: cart?.cartItems[0]?.regular_price || 0,
        course_qty: cart?.cartItems[0]?.quantity || 0,
        total_course_fee: cart?.cartItems[0]?.regular_price || 0,
        discount_course_fee: cart?.cartItems[0]?.discount_price || 0,
        sub_total_course_fee: cart?.totalPrice || 0
    });

    

    /*=========>submitValue part start<===========*/
    const submitValue = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://itder.com/api/course-purchase', {
                course_id: 4,
                admission_date: formData.admission_date,
                photo: photo,
                name: formData.name,
                father_name: formData.father_name,
                father_phone_no: formData.father_phone_no,
                school_collage_name: formData.school_collage_name,
                job_title: formData.job_title,
                email: formData.email,
                gender: formData.gender,
                present_address: formData.present_address,
                permanent_address: formData.permanent_address,
                nid_no: formData.nid_no,
                phone_no: formData.phone_no,
                local_guardian_name: formData.local_guardian_name,
                local_guardian_phone_no: formData.local_guardian_phone_no,
                date_of_birth: formData.date_of_birth,
                blood_group: formData.blood_group,
                course_fee: cart?.cartItems[0]?.regular_price,
                course_qty: cart?.cartItems[0]?.quantity,
                total_course_fee: cart?.cartItems[0]?.regular_price,
                discount_course_fee: cart?.cartItems[0]?.discount_price,
                sub_total_course_fee: cart?.totalPrice
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success(response.data.message);
 
           
            dispatch(activeValue({
                response: response.data,
                course: cart?.cartItems[0]?.course_name
            }));

            setTimeout(() => {
                dispatch(clearCart());
                navigate('/order-details');
            }, 3000);

        } catch (error) {
            console.error(error.response.data.errors[0]);
            toast.error(error.response.data.errors[0]);
        }
    };
    /*=========>submitValue part start<===========*/
      
    
    /*==========( Function to handle form submission )===============*/
    const handleChange = (event) => {
        const { name, value } = event.target;
 
        setFormData({
            ...formData,
            [name]: value
        });
    };
     /*==========( Function to handle form submission )===============*/



    /*=============( Photo Here )===========*/
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        console.log(file.name)
        setPhoto(file); 
        setFormData({
            ...formData,
            photo: file, 
        });
        setPhotoPreview(URL.createObjectURL(file)); 
    };
    /*=============(Photo Here )============*/


    /*===========( handleSubmit )=======*/
    const handleSubmit = (event) => {
        event.preventDefault();
        if (cart.totalPrice > 0) {
         
            console.log("Form Data Submitted:", formData);
        } else {
            alert("Please add items to the cart before submitting.");
        }
    };
    /*===========( handleSubmit )=======*/


    /*=====(Cart quantity handlers)======*/
    const handleQuantityChange = (item, type) => {
        if (type === "increment") {
           
            dispatch({ type: "INCREMENT_ITEM_QUANTITY", payload: item.id });
        } else if (type === "decrement" && item.quantity > 1) {
          
            dispatch({ type: "DECREMENT_ITEM_QUANTITY", payload: item.id });
        }
    };
    /*=====(Cart quantity handlers)======*/


    return (
        <div className="mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
            </div>

            <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                {/* Trainee Information Section */}
                <div className="form-section">
                    <div className="mb-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        
                    </div>

                    {/* More fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="father_name" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                type="text"
                                id="father_name"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="father_phone_no" className="block font-semibold text-base mb-2">Father Number:</label>
                            <input
                                type="text"
                                id="father_phone_no"
                                name="father_phone_no"
                                value={formData.father_phone_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="school_collage_name" className="block font-semibold text-base mb-2">School/College:</label>
                            <input
                                type="text"
                                id="school_collage_name"
                                name="school_collage_name"
                                value={formData.school_collage_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                           <label htmlFor="job_title" className="block font-semibold text-base mb-2">Job Information:</label>
                            <input
                                type="text"
                                id="job_title"
                                name="job_title"  // Updated to "job_title"
                                value={formData.job_title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold text-base mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block font-semibold text-base mb-2">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="present_address" className="block font-semibold text-base mb-2">Present Address:</label>
                            <input
                                type="text"
                                id="present_address"
                                name="present_address"
                                value={formData.present_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="permanent_address" className="block font-semibold text-base mb-2">Permanent Address:</label>
                            <input
                                type="text"
                                id="permanent_address"
                                name="permanent_address"
                                value={formData.permanent_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nid_no" className="block font-semibold text-base mb-2">National ID No:</label>
                            <input
                                type="text"
                                id="nid_no"
                                name="nid_no"
                                value={formData.nid_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_no" className="block font-semibold text-base mb-2">Phone Number:</label>
                            <input
                                type="text"
                                id="phone_no"
                                name="phone_no"
                                value={formData.phone_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="local_guardian_name" className="block font-semibold text-base mb-2">Local Guardian Name:</label>
                            <input
                                type="text"
                                id="local_guardian_name"
                                name="local_guardian_name"
                                value={formData.local_guardian_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="local_guardian_phone_no" className="block font-semibold text-base mb-2">Local Guardian Phone:</label>
                            <input
                                type="text"
                                id="local_guardian_phone_no"
                                name="local_guardian_phone_no"
                                value={formData.local_guardian_phone_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                            <label htmlFor="date_of_birth" className="block font-semibold text-base mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="blood_group" className="block font-semibold text-base mb-2">Blood Group:</label>
                            <input
                                type="text"
                                id="blood_group"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                     {/* Image Part */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="photo" className="block font-semibold text-base mb-2">Upload Photo:</label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                        
                        
                     {/* Display a preview of the uploaded photo */}
                     {photoPreview && (
                        <div className="mt-2">
                          <img src={photoPreview} alt="Photo Preview" className="h-[100px] w-[100px] object-cover border rounded-md" />
                        </div>
                      )}
                        </div>
                    {/* Display a preview of the uploaded photo */}



                    </div>
                     {/* Image Part */}


                </div>
                {/* Trainee Information Section */}
                {/* Course Outline and Cart Summary */}
                <div className="m-mt_16px">
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
                                                <td colSpan="4" className="text-center p-4">Your cart is empty.</td>
                                            </tr>
                                        ) : (
                                            cart.cartItems.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-300 overflow-x-auto">
                                                    <td>
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-[20%] text-center flex items-center justify-center">
                                                                <RiDeleteBin5Line
                                                                    className="text-xl hover:text-red-500 cursor-pointer"
                                                                    onClick={() => dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item.id })}
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
                                                                onClick={() => handleQuantityChange(item, "decrement")}
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
                                                                onClick={() => handleQuantityChange(item, "increment")}
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

                            <div className="lg:w-[42%] bg-white p-3 border-2">
                                {/* Display total price */}
                                <div className="border-2 border-gray-200 p-4">
                                    <h3 className="text-center font-bold text-[14.4px]">Total Price</h3>
                                    <div className="mt-4 text-center">
                                        <h4 className="text-3xl font-bold">Tk {cart.totalPrice}</h4>
                                    </div>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        onClick={submitValue}
                                        type="submit"
                                        disabled={cart.cartItems.length === 0}
                                        className="bg-[#6f42c1] hover:bg-[#512a96] text-white font-bold py-2 px-4 rounded"
                                    >
                                        Submit Admission Form
                                    </button>
                                    <Link to="/cart" className="bg-[#f3f3f3] hover:bg-[#ccc] font-bold py-2 px-4 rounded">
                                        Go to Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* Course Outline and Cart Summary */}
            </form>

        </div>
    );
};

export default Checkout;
