import React from 'react';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';

export default class Header extends React.Component
{
  render()
  {
    return (
      <div>
        < AppBar/>
        < MenuBar /> {this.props.children}
      </div>
    )
  }
}
