import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your favorite food here</h2>
                <p>Choose from a diverse menu a delectable array of dishes crafted with the finest ingredients and culinaary expertise. Our mission is to satisfy your cravings and elevate your dining experience one delicious meal at a time</p>
                < a href='#explore-menu' className='button'> View Menu</a>


            </div>
        </div>
    )
}

//     <button>View Menu</button>

export default Header
