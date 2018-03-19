import React from 'react';
import { Header, Segment,List } from 'semantic-ui-react';

export default class Footer extends React.Component
{
  render()
  {
    return(
      <div className="Footer" style={{marginTop:"30px"}}>
          <Segment clearing inverted>
            <img src="http://www.freeiconspng.com/uploads/green-humming-bird-png-4.png" style={{marginbottom:"0px",height:"90px",paddingLeft:"110px",marginTop:"-80px",position:"absolute"}}/>
          <br />
          <List bulleted horizontal style={{marginLeft:"70px",marginTop:"20px"}}>
            <List.Item as='a' style={{color:"white"}}>Home</List.Item>
            <List.Item as='a' style={{color:"white"}}>Blog</List.Item>
            <List.Item as='a' style={{color:"white"}}>Pricing</List.Item>
            <List.Item as='a' style={{color:"white"}}>About</List.Item>
            <List.Item as='a' style={{color:"white"}}>FAQ</List.Item>
            <List.Item as='a' style={{color:"white"}}>Contact</List.Item>
          </List>
          <br />
          <h5 style={{marginLeft:"70px",color:"#d1d3d6"}}>OMS @ 2016 </h5>
          </Segment>
      </div>
    );
  }
}
