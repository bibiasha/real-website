import React from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { useState } from 'react';
import Product from './Product';
import productLists from './ProductLists';



function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [searchQuery, setSearchQuery] = useState('');

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    // const handleSearch = (e) => {
    //     setSearchQuery(e.target.value);
    // }

    // const filteredBasket = basket.filter((item) =>
    //     item.title.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div className='header'>
            <Link to="/">
                <img className="header_logo" src="https://as2.ftcdn.net/v2/jpg/04/79/83/99/1000_F_479839974_RocNey49zGSxKpjsGWny9j0fvyZvEGdK.jpg" alt='' />
            </Link>

            <div className="header_search">
                <input className="header_searchInput" type="text" onChange={(event) => {
                    setSearchQuery(event.target.value);
                }} />
                {/* <span className="header_optionBasket header_basketCount">        value={searchQuery} onChange={handleSearch}
                    {filteredBasket.length}
                </span> */}
                <SearchIcon className="header_searchIcon" />
            </div>
            <div>
                {/* {
                    productLists.filter((value) => {
                        if (searchQuery == "") {
                            return value;
                        } else if (value.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return value;
                        }
                    })
                        .map((value) => {
                            return (
                                <div className='templete' key={value.id}>
                                    <img src={value.imgage} alt='' />
                                    <h3>{value.title}</h3>
                                    <p className='price'>${value.price}</p>
                                </div>
                            )
                        })
                } */}
            </div>

            <div className='header_nav'>
                <Link to={!user && "/login"}>
                    <div onClick={handleAuthentication} className='header_option'>
                        <span className='header_optionLineOne'>Hello {!user ? 'Guest' : user.email}</span>
                        <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <Link to="/orders">
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Returns</span>
                        <span className='header_optionLineTwo'>Order</span>
                    </div>
                </Link>

                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingCartIcon />
                        <span className='header_optionBasket header_basketCount'>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;


//if the user variable is truthy (meaning a user is currently logged in), the auth.signOut() method is called, which will sign the user out of the current session or device. This could involve invalidating any authentication tokens or cookies, or performing other actions to revoke the user's access to the application or website.

