import React from 'react';
import {Menu, Segment} from 'semantic-ui-react';
import {Modal, Button} from 'semantic-ui-react'
import SwipeableViews from 'react-swipeable-views';
import LoginForm from './Login2.jsx';
// import LogoutForm from './Logout.jsx';
import SignupForm from './signup.jsx';
import Cookie from 'react-cookie';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Request from 'superagent';

export default class AppBar extends React.Component
{
  constructor(prop)
  {
    super();
    this.state = {
      slideIndex: 0,
      modalOpen: false
    };
  }
  handleOpen() {
    this.setState({
      modalOpen: true
    }, function() {
      console.log("--------------->" + this.state.modalOpen);
    });
  }
  handleClose(modalOpen) {
    this.setState({modalOpen: modalOpen});
  }
  handleCustomerService()
  {
    alert('clicked');
  }
  handleTrackOrder()
  {
    alert('clicked');
  }
  handleChange(value) {
    this.setState({slideIndex: value});
  }
  handleChange1() {
    console.log("inside Handle change1");
    this.setState({slideIndex: 0});
    alert('You have signed up successfully');
  }
  handleLogout(){
    cookies.remove('email');
    Request.post('/logout').query({email: cookies.get('email')}).end((err, res) => {
      if (err)
        console.log(err);
        location.reload();
      console.log(res);
    });
  }
  render()
  {
    // console.log(cookies.load('email'));
    var status='';
    var signIn=(<Modal trigger={< Menu.Item name = 'SignIn' className = 'appBarMenuItem' />} closeIcon className='appBarMenuItem'>
      <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange.bind(this)}>
        <div>
          <LoginForm handleClick={this.handleChange.bind(this)}/>
        </div>
        <div>
          <SignupForm modalOpen={this.handleClose.bind(this)} handleClick={this.handleChange.bind(this)} handleClick1={this.handleChange1.bind(this)}/>
        </div>
      </SwipeableViews>
    </Modal>);
    if(cookies.get('email')){
      status = <h3 style={{marginLeft:'35%',marginTop:'auto'}}>Hello {cookies.get('email')}</h3>
      signIn = < Menu.Item name = 'SignOut' onClick={this.handleLogout.bind(this)} className = 'appBarMenuItem' />
    }
    return (
      <div id="Appbar">
        <Menu style={{
          backgroundColor: "#e0e1e2"
        }} pointing secondary size='massive' className="Appbar">
        {status}
          <Menu.Menu position='right' style={{
            marginRight: "55px"
          }}>
            <Menu.Item name='customer service' onClick={this.handleCustomerService.bind(this)} className='appBarMenuItem'/>
            <Menu.Item name='Track order' onClick={this.handleTrackOrder.bind(this)} className='appBarMenuItem'/>
            {signIn}
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
