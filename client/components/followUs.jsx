import React from 'react';
import HeaderComponent from './headerComponent.jsx';
import { Button } from 'semantic-ui-react';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';

export default class FollowUs extends React.Component
{
  render()
  {
    return(
      <Reveal effect="animated zoomIn">
      <div className="FollowUs">
        <div className="FollowUsHeading" style={{marginTop:"30px",marginBottom:"25px"}}>
          <HeaderComponent heading="Follow Our Store On" />
        </div>
        <div className="Icons">
          <center>
            <Button circular color='facebook' icon='facebook' />
            <Button circular color='twitter' icon='twitter' style={{marginLeft:"15px"}}/>
            <Button circular color='linkedin' icon='linkedin' style={{marginLeft:"15px"}}/>
            <Button circular color='google plus' icon='google plus' style={{marginLeft:"15px"}}/>
          </center>
        </div>
      </div>
      </Reveal>
    );
  }
}
