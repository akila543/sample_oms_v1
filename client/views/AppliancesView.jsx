import React from 'react';
import Appliances from './../components/appliances.jsx';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';

export default class AppliancesView extends React.Component
{
  render()
  {
    return(
        <div>
          <Appliances />
        </div>
    );
  }
}
