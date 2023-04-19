import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <div>
            <div className='container'>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>Connect with us</h4>
                                <ul className="social-icons">
                                    <li><a href="https://www.facebook.com/profile.php?id=100089901940709"><FaFacebook /></a></li>
                                    {/* <li><a href="#"><FaTwitter /></a></li> */}
                                    <li><a href="https://www.instagram.com/mr_sign_boards15/"><FaInstagram /></a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h4>About us</h4>
                                <p>We are a reliable signboard company in North Goa. Our team specializes in creating custom solutions for businesses. We use high-quality materials and modern technology to produce visually appealing and durable signboards. Our mission is to deliver exceptional results that exceed our clients' expectations.</p>
                            </div>
                            <div className="col-md-4">
                                <h4>Contact us</h4>
                                <p>Mapusa North Goa<br />
                                    <br />
                                    Phone: 7028145465<br />
                                    Email: mrsignboards15@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-bar">
                        <div className="container">
                            <p>&copy; 2023 www.mrsignboards15.com All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer
