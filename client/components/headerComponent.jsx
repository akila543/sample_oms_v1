import React from 'react';
import { Header} from 'semantic-ui-react';

export default class HeaderComponent extends React.Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return(
      <div className="HeaderComponent">
      <Header as='h1' textAlign='center'>
        <Header.Content>
          {this.props.heading}
        </Header.Content>
      </Header>
      </div>
    );
  }
}
