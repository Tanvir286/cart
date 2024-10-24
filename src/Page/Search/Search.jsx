import React, { useState } from 'react';
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaPhoneSquareAlt } from "react-icons/fa";
import axios from 'axios';

const Search = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const [responseData, setResponseData] = useState(null); 

   

    
    
    const handleSearch = async () => {
        if (!name && !phoneNumber) {
            setError("Please enter either a form number or a phone number.");
            return;
        }
    
       
    
        
        setError(""); 
        setLoading(true);
    
        try {
            const response2 = await axios.post('https://itder.com/api/search-purchase-data', {
                form_no: name,
                phone_no: phoneNumber
            });
    
            console.log('Response received:', response2.data);
            setResponseData(response2.data);
        } catch (error) {
            console.error('Error details:', error);
            if (error.response2) {
                setError(error.response2.data.message || `Server error: ${error.response.status}. Please try again.`);
            } else if (error.request) {
                setError('No response from the server. Please check your network connection or try again later.');
            } else {
                setError(`Error: ${error.message}. Please try again.`);
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="min-h-screen text-text_40px font-bold ">
            <h1 className="text-center mt-5">Search Here</h1>

            <div className='flex gap-x-3 justify-center'>
                {/* Name input */}
                <div className="h-[52px] relative col-span-4 w-[260px] mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Search by Order Id"
                        className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <AiOutlineFieldNumber className="text-2xl text-black absolute right-2 top-[15px]" />
                </div>

                {/* Phone input */}
                <div className="h-[52px] relative col-span-4 w-[260px] mb-4">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Search by phone number"
                        className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    <FaPhoneSquareAlt className="text-2xl text-black absolute right-2 top-[15px]" />
                </div>
            </div>

            <div className="flex justify-center mb-4">
                <button 
                    onClick={handleSearch} 
                    className={`bg-blue-500 text-white px-4 py-2 rounded text-center w-[530px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>} {/* Error message display */}

         
             {/* Respnsive Data */}
             {responseData && (
    <div className="mt-10 p-5 bg-gray-100 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">Search Results</h2>

        {/* User Information */}
        <table className="table-auto w-full mb-4 border-collapse">
            <thead>
                <tr>
                    <th colSpan="2" className="text-left text-lg font-bold border-b pb-2">User Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 font-semibold">Photo:</td>
                    <td className="p-2">
                        <img src={responseData?.singleCoursePurchaseData?.photo} alt="User Photo" className="w-16 h-16 rounded-full" />
                    </td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Name:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.name || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Email:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.email || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Phone Number:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.phone_no || 'N/A'}</td>
                </tr>
            </tbody>
        </table>

        {/* Course Information */}
        <table className="table-auto w-full mb-4 border-collapse">
            <thead>
                <tr>
                    <th colSpan="2" className="text-left text-lg font-bold border-b pb-2">Course Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 font-semibold">Course Name:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.course_data?.course_name || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Course Fee:</td>
                    <td className="p-2">${responseData?.singleCoursePurchaseData?.course_fee || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Discounted Fee:</td>
                    <td className="p-2">${responseData?.singleCoursePurchaseData?.discount_course_fee || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Admission Date:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.admission_date || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Course Image:</td>
                    <td className="p-2">
                        <img src={responseData?.singleCoursePurchaseData?.course_data?.photo} alt="Course Image" className="w-full h-32 object-cover rounded-md" />
                    </td>
                </tr>
            </tbody>
        </table>

        {/* Personal Information */}
        <table className="table-auto w-full mb-4 border-collapse">
            <thead>
                <tr>
                    <th colSpan="2" className="text-left text-lg font-bold border-b pb-2">Personal Information</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 font-semibold">Father's Name:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.father_name || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Guardian Name:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.local_guardian_name || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Guardian Phone:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.local_guardian_phone_no || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Date of Birth:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.date_of_birth || 'N/A'}</td>
                </tr>
                <tr>
                    <td className="p-2 font-semibold">Blood Group:</td>
                    <td className="p-2">{responseData?.singleCoursePurchaseData?.blood_group || 'N/A'}</td>
                </tr>
            </tbody>
        </table>

        {/* New Search Button */}
        <div className="text-center mt-5">
            <button 
                
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                New Search
            </button>
        </div>
    </div>
)}
{/* Resposnive data */}


        </div>
    );
};

export default Search;
