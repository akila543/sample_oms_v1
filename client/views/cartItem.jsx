import React from 'react';
import OrderVerification from './../components/orderVerification.jsx';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';
export default class CartItem extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      cartCounter: 0,
    }
  }
  render() {
    return (
      <div style={{marginTop:"110px"}}>
        < OrderVerification/>
      </div>
    );
  }
}
