import React, { useEffect, useState } from 'react';
import axios from 'axios';

// redux
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/chart';

const Courses = () => {

  // values 
  const [info, setInfo] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);  
  const dispatch = useDispatch();  
  console.log(info);
 

  
  // Api Fetch
  const fetchQuote = async () => {
    try {
      const { data } = await axios.get('https://itder.com/api/get-course-list');
      setInfo(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  
   //   handleAddtoCart
  const handleAddToCart = (course) => {
    dispatch(addToCart(course));  
    setActiveCourse(course.id);  
  };


  //   useEffects
  useEffect(() => {
    fetchQuote();
  }, []);



  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {info.courseData &&
          info.courseData.map((course) => {
            const discountPercentage = Math.round(
              ((course.regular_price - course.discount_price) / course.regular_price) * 100
            );
            const isActive = activeCourse === course.id;  

            return (
              <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={course.photo}
                    alt={course.course_name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-0 left-0 p-2">
                    <h3 className="text-white text-xl font-bold">{course.course_name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">
                    {course.course_name}
                  </h2>
                  <p className="text-gray-600 text-md mb-4">Course Details</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="line-through text-gray-400 text-sm">
                        Tk {course.regular_price}
                      </span>
                      <span className="text-green-600 text-md font-bold ml-2">
                        -{discountPercentage}%
                      </span>
                      <span className="text-black text-lg font-bold ml-2">
                        Tk {course.discount_price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      className={`py-2 px-4 rounded w-full font-bold text-md ${
                        isActive
                          ? 'bg-green-500 text-white cursor-not-allowed'  
                          : 'bg-blue-500 text-white hover:bg-blue-600'  
                      }`}
                      onClick={() => handleAddToCart(course)}  
                      disabled={isActive}  
                    >
                      {isActive ? 'Added' : 'Add To Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Courses;
