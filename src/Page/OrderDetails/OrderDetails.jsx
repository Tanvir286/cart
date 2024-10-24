
import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";



const OrderDetails = () => {

    const local = useSelector((state) => state?.local);

   

    const [localData, setLocalData] = useState(() => {
        const savedData = localStorage.getItem("localData");
        return savedData ? JSON.parse(savedData) : null;
      });
   
   


    useEffect(() => {
        if (local?.value) {
          const response = local.value;
          setLocalData(response); 
          localStorage.setItem("localData", JSON.stringify(response)); 
        }
      }, [local]);




    return (
        <div className="m-mt_16px">
            <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">
                <div className="bg-white lg:p-p_30px w-full">
                     {/* Order Information */}
                      <div className=" mt-10 w-full max-w-4xl mx-auto bg-gradient-to-r from-[#f6f7f8] to-[#e2e6eb] shadow-lg rounded-lg p-6 mb-8">
                      <h2 className="text-3xl font-bold text-center mb-4 tracking-wide text-gray-700">
                       Last Purchase  Information
                       </h2>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xl font-semibold mb-2">Order Id:</p>
                        <span className="bg-[#D2C5A2] text-lg px-4 py-2 rounded-md shadow-md">
                         {localData?.response?.coursePurchaseData.form_no || 'N/A' }
                        </span>
                       </div>
                      </div>
                      {/* Order Information */}

                     {/* User Details Section */}
                     {/* User Details Section */}
                     <div className="p-5">
                        <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">User Details</h2>
                        <table className="w-full border-collapse">
                          <thead>                    
                            <tr className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-800">
                              <th className="py-4 px-6 border border-gray-300 text-left">Field</th>
                              <th className="py-4 px-6 border border-gray-300 text-left">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Full Name */}
                            <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">                    
                              <td className="py-3 px-6 border border-gray-300 font-medium">Full Name:</td>
                              <td className="py-3 px-6 border border-gray-300">
                                {localData?.response?.coursePurchaseData.name || 'N/A'}
                              </td>
                            </tr>
                            {/* Mobile Number */}
                            <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">                    
                              <td className="py-3 px-6 border border-gray-300 font-medium">Mobile Number:</td>
                               <td className="py-3 px-6 border border-gray-300">
                                 {localData?.response?.coursePurchaseData.phone_no || 'N/A'}
                               </td>
                            </tr>
                            {/* Gender */}
                            <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">                    
                               <td className="py-3 px-6 border border-gray-300 font-medium">Gender:</td>
                               <td className="py-3 px-6 border border-gray-300">
                                  {localData?.response?.coursePurchaseData.gender || 'N/A'}
                               </td>
                            </tr>
                            {/* Address */}
                            <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">                    
                           <td className="py-3 px-6 border border-gray-300 font-medium">Address:</td>
                           <td className="py-3 px-6 border border-gray-300">
                               {localData?.response?.coursePurchaseData.present_address || 'N/A'}
                           </td>
                            </tr>
                            {/* Email */}
                            <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                             <td className="py-3 px-6 border border-gray-300 font-medium">Email:</td>
                              <td className="py-3 px-6 border border-gray-300">
                                {localData?.response?.coursePurchaseData.email || 'No email provided'}
                              </td>
                            </tr>
                            {/* NID No */}
                            <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                              <td className="py-3 px-6 border border-gray-300 font-medium">NID No:</td>
                              <td className="py-3 px-6 border border-gray-300">
                                  {localData?.response?.coursePurchaseData.nid_no || 'N/A'}
                              </td>
                            </tr>
                            {/* Course Id */}
                            <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                              <td className="py-3 px-6 border border-gray-300 font-medium">Course Id:</td>
                                <td className="py-3 px-6 border border-gray-300">
                                   {localData?.response?.coursePurchaseData.course_id || 'N/A'}
                                </td>
                            </tr>
                            {/* Order Created */}
                            <tr className="bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                              <td className="py-3 px-6 border border-gray-300 font-medium">Order Created:</td>
                               <td className="py-3 px-6 border border-gray-300">
                                 {localData?.response?.coursePurchaseData.admission_date || 'N/A'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                    </div>                  
                     {/* User Details Section */}

                   
                    {/* Courses Section */}
                     <div className="lg:my-8 md:my-2 my-8 px-4">
                       <p className="md:my-2 font-semibold text-xl text-center text-gray-800">Courses:</p>
                       <table className="w-full border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                          <tr className="text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 font-semibold">
                            <th className="py-4 px-2 border">Image</th>
                            <th className="py-4 px-2 border">Course Name</th>
                            <th className="py-4 px-2 border">Student Name</th>
                            <th className="py-4 px-2 border">Quantity</th>
                            <th className="py-4 px-2 border">Price</th>
                            <th className="py-4 px-2 border">Total</th>
                          </tr>
                        </thead>
                        <tbody className="md:text-base text-sm font-semibold">
                          <tr className="hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="border text-center w-40 h-22 px-2">
                              <img
                                className="w-full h-full object-cover mx-auto rounded-lg shadow-sm"
                                src={localData?.response?.coursePurchaseData.photo || '/fallback-image.png'}
                                alt="Course"
                              />
                            </td>
                            <td className="py-4 px-2 text-center border">
                              {localData?.course|| 'Course Name'}
                            </td>
                            <td className="py-4 px-2 text-center border">
                              {localData?.response?.coursePurchaseData.name || 'Student Name'}
                            </td>
                            <td className="py-4 px-2 text-center border">
                              {localData?.response?.coursePurchaseData.course_qty || 0}
                            </td>
                            <td className="py-4 px-2 text-center border">
                              {localData?.response?.coursePurchaseData.discount_course_fee || 0}
                            </td>
                            <td className="py-4 px-2 text-center border">
                              {localData?.response?.coursePurchaseData.sub_total_course_fee || 0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    
                      {/* Total Section */}
                      <div className="mt-6 p-4 border-t bg-gradient-to-r from-gray-100 to-gray-200 font-semibold text-right rounded-b-lg shadow-sm">
                        <p className="text-xl">
                          Total: {localData?.response?.coursePurchaseData.sub_total_course_fee || 0}
                        </p>
                      </div>
                    </div>
                    {/* Courses Section */}

                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
