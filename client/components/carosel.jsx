import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class Carousel extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      slideIndex: 3
    }
    this.handleSlide = this.handleSlide.bind();
  }

  handleSlide()
  {

  }
  render()
  {
    return (
      <Reveal effect="animated fadeInUp">
        <div className="carosel" style={{
          postion: "relative"
        }}>
          <AutoPlaySwipeableViews >
            <div >
              <img height="650px" width="100%" src="http://res.cloudinary.com/stackroute/image/upload/v1504010919/series1_h6x1mm.png"/>
            </div>
            <div>
              <img height="650px" width="100%" src="http://res.cloudinary.com/stackroute/image/upload/v1504010910/UK_Home_Wedding-List_21-5-2015_1340x500._V292460783__gbyo9g.jpg"/>
            </div>
            <div>
              <img height="650px" width="100%" src="http://res.cloudinary.com/stackroute/image/upload/v1504010909/iphone_5C_ofnbs6.jpg"/>
            </div>
            <div>
              <img height="650px" width="100%" src="http://res.cloudinary.com/stackroute/image/upload/v1504010911/17AW_BTL_ECOM_MS_BMW_FullBleedHero-Desktop_1440x500_3_2_erwfw0.jpg"/>
            </div>
            <div>
              <img height="650px" width="100%" src="https://d21kp9itql721v.cloudfront.net/cdn/698803/media/wysiwyg/17AW_BTL_ECOM_MS_BMW_FullBleedHero-Desktop_1440x500_3_2.jpg"/>
            </div>
            <div>
              <img height="650px" width="100%" src="http://res.cloudinary.com/stackroute/image/upload/v1504010910/slide4_otyc8e.jpg"/>
            </div>
          </AutoPlaySwipeableViews>
          <div style={{
            textAlign: "center",
            marginTop: "15px"
          }}>
            <span className="dot" onClick={() => this.handleSlide(0)}></span>
            <span className="dot" onClick={() => this.handleSlide(1)} style={{
              marginLeft: "25px"
            }}></span>
            <span className="dot" onClick={() => this.handleSlide(2)} style={{
              marginLeft: "25px"
            }}></span>
            <span className="dot" onClick={() => this.handleSlide(3)} style={{
              marginLeft: "25px"
            }}></span>
            <span className="dot" onClick={() => this.handleSlide(4)} style={{
              marginLeft: "25px"
            }}></span>
            <span className="dot" onClick={() => this.handleSlide(5)} style={{
              marginLeft: "25px"
            }}></span>
          </div>
        </div>
      </Reveal>
    );
  }
}
