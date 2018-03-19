import React from 'react';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';
import PurchaseProduct from './../components/purchaseProductPage.jsx';

export default class ProductDisplay extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {

    return (
      <div style={{marginTop:"110px"}}>

        < PurchaseProduct />

      </div>
    );
  }
}
