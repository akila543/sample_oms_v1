import React from 'react';
import { Segment } from 'semantic-ui-react';
import HeaderComponent from './headerComponent.jsx';
import { Button, Icon } from 'semantic-ui-react';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';

export default class ProductPoster extends React.Component
{
  render()
  {
    return(
      <center>
      <Reveal effect="animated fadeInLeft" className="App-header">
      <div >
          <div  style={{marginTop:"25px"}}>
            <HeaderComponent heading="New Launch" />
          </div>
          <div  style={{marginTop:"20px",postion:"relative"}}>
            <img src="http://aotw-pd.s3.amazonaws.com/images/MacBookAir.jpg" />
          </div>
          <div >
            <center>
              <h1 style={{marginTop:"-175px",color:"#bac0c6"}} className="PosterText">
              MacBookAir Now at our store
              <br />
              <Button basic color="teal" animated='vertical'>
                  <Button.Content hidden>
                    <Icon name='shop' />
                  </Button.Content>
                  <Button.Content visible>
                    Shop Now
                  </Button.Content>
              </Button>
              </h1>
            </center>
          </div>
      </div>
    </Reveal>
    </center>
    );
  }
}
