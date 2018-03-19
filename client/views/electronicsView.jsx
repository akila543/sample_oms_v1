import React from 'react';
import Electronics from './../components/electronics.jsx';

export default class ElectronicsView extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    console.log(this.context);
    return(
        <div>
          <Electronics />
        </div>
    );
  }
}
