import React from 'react'
import "./Home.css";
import Product from './Product';
import Header from './Header';


function Home() {
  return (
    <div className="home">
     <div className="home_containert">
     <img  className='home_image'
     src="https://img.freepik.com/premium-psd/shop-sign-mockup-black-wall_35913-2097.jpg?w=826" alt=""/>
     <div className='home_row'>
        <Product id='23' title="Visiting Card" price={2} image= 'https://previews.123rf.com/images/isroil/isroil2203/isroil220300089/183358768-business-card-design.jpg' rating={5}/>
       <Product id='2' title="Small Board" price={1000} image= 'https://cdn.dribbble.com/users/2405927/screenshots/9108435/media/60e4ffc651003a855cd2a86fa67ad77a.jpg?compress=1&resize=800x600&vertical=top' rating={5}/>
     </div>
     <div className='home_row'>
     <Product id='3' title="WEDDING CARD" price={50} image= 'https://t4.ftcdn.net/jpg/04/67/48/55/240_F_467485580_T3tfGVhB7YUvJbaGSnud5mtqyY1CrclW.jpg' rating={5}/>
       <Product id='230' title="MENU FOR RESTUARANT" price={20} image= 'https://coreldrawdesign.com/resources/previews/preview-free-restaurant-menu-card-design--1643873308.jpg' rating={5}/>
       <Product id='203' title="LARGE SIZE SIGN BOARDS" price={10000} image= 'https://5.imimg.com/data5/SELLER/Default/2020/12/LT/WA/JV/32297690/shop-signboard-design-500x500.jpg' rating={5}/>
       
     </div>
     <div className='home_row'>
     <Product id='293' title="LARGE SIZE SIGN BOARDS" price={10000} image= 'https://www.creativeconcepts.in/images/products/led-signages.jpg' rating={5}/>
  </div>
     </div> 
    </div>
  )
}

export default Home;
