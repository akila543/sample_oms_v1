import React from 'react';
import  HeaderComponent from './headerComponent.jsx';
import Coverflow from 'react-coverflow';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
export default class TrendingProducts extends React.Component
{
  render()
  {
    return(
      <Reveal effect="animated fadeInUp">
      <div className="TrendingProducts" style={{marginTop:"30px"}}>
          <div className="TrendingProductsHeader">
            < HeaderComponent heading="TrendingProducts"/>
          </div>
          <div className="TrendingProductsContent" style={{marginTop:"15px"}}>
            <Coverflow width="100%" height="400"
                displayQuantityOfSide={2}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={3}
                className="ProductsCover">
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011424/1_llrxmi.jpg' alt='Oneplus 5'  />
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011474/vr_g66dxc.jpg' alt='VR Glasses' />
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011511/earphones_nc3hxm.jpg' alt='Revols Earphones' />
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011824/bridal_dexcwz.jpg' alt='Bridal wears' />
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011894/juicers_uvkyzp.jpg' alt='juicers' />
                <img src='http://res.cloudinary.com/stackroute/image/upload/v1504011931/sh_bmw2zs.jpg' alt='shoes' />
            </Coverflow>
          </div>
      </div>
      </Reveal>
    );
  }
}
