import React from 'react';
import Nav from '../components/Nav'
import HeroHeader from '../components/HeroHeader';
import Category from '../components/Category';


const Home = () => {
  return (
    <div className='w-full h-full '>
    <Nav/>
    <HeroHeader/>    
    <Category/>
    </div>
  );
};

export default Home;
