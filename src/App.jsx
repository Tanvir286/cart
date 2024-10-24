
import React, { useState } from "react";
import Courses from "./Courses";
import Cart from "./Cart";

const App = () => {
    // Cart state managed at the parent level
    const [cart, setCart] = useState([]);

    return (
        <div>
            {/* Pass the cart and setCart to Courses and Cart */}
            <Courses cart={cart} setCart={setCart} />
            <Cart cart={cart} setCart={setCart} />
        </div>
    );
};

export default App;
