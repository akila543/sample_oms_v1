import React from 'react';
import {
  Dropdown,
  Icon,
  Menu,
  Input,
  Label,
  Divider
} from 'semantic-ui-react';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class MenuBar extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      activeItem: 'home'
    }
  }
  handleItemClick(e, {name})
  {
    this.setState({activeItem: name});
  }
  render()
  {
    var activeItem = this.state.activeItem;
    return (
      <div className="Menubar">
        <Menu secondary style={{
          paddingLeft: "130px",
          marginBottom: "0px"
        }} size="huge">
          <Menu.Item size='massive'></Menu.Item>
          <Menu.Item as={Link} to='/electronics' active={this.state.activeItem === 'electronics'} className="MenuBarMenuItem" color={'red'} name='electronics' onClick={this.handleItemClick.bind(this)}>
            Electronics
          </Menu.Item>
          <Menu.Item as={Link} to='/fashion' active={this.state.activeItem === 'fashion'} className="MenuBarMenuItem" color={'red'} name='fashion' onClick={this.handleItemClick.bind(this)}>
            Fashion
          </Menu.Item>
          <Menu.Item as={Link} to='/appliances' active={this.state.activeItem === 'appliances'} className="MenuBarMenuItem" color={'red'} name='appliances' onClick={this.handleItemClick.bind(this)}>
            Appliances
          </Menu.Item>
          <Menu.Item as={Link} to='/deals' active={this.state.activeItem === 'deals'} className="MenuBarMenuItem" color={'red'} name='deals' onClick={this.handleItemClick.bind(this)}>
            Deals of the Day
          </Menu.Item>
          <Menu.Menu>
            <Menu.Item name='search' onClick={this.handleItemClick.bind(this)} style={{
              height: "35px",
              marginTop: "6px"
            }}>
              <Input icon={< Icon name = 'search' inverted circular link size = "small" />} style={{
                marginBottom: "2px"
              }} placeholder='Search Products'/>
            </Menu.Item>
            <Menu.Item as={Link} to='/cartItem' name='cart' onClick={this.handleItemClick.bind(this)} style={{
              marginTop: "16px"
            }}>
              <Icon name='shop'/>
              <Label color='red' floating>{this.props.cartData.count}</Label>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Link to={'/'}>
          <Reveal effect="animated fadeInLeft">
            <img src="http://res.cloudinary.com/stackroute/image/upload/v1504010910/green-humming-bird-png-4_bq4jga.png" name='icon' onClick={this.handleItemClick.bind(this)} style={{
              marginbottom: "0px",
              height: "90px",
              paddingLeft: "30px",
              marginTop: "-110px",
              position: "absolute"
            }}/>
          </Reveal>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {cartData: state.cartData}
}

export default connect(mapStateToProps)(MenuBar);
