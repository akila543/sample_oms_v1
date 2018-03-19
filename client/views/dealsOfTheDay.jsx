import React from 'react';
import Deals from './../components/Deals.jsx';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';

export default class DealsOfTheDay extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (
      <div style={{marginTop:"110px"}}>
        < Deals />
      </div>
    );
  }
}
