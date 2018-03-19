import React from 'react';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';
import ProductConfirmationSlider from './../components/productConfirmationSlider.jsx'
export default class ProductConfirmation extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    console.log("pdt",this.context.productCheckOut);
    return (
      <div style={{marginTop:"110px"}}>
        < ProductConfirmationSlider />
      </div>
    );
  }
}
