import React, {Component} from 'react'
import {  Button,  Header,  Icon,  Modal,  Image,  Grid} from 'semantic-ui-react'
import {Checkbox, Form, Radio, Select} from 'semantic-ui-react'
import {Input, Segment, Label, Dropdown} from 'semantic-ui-react'
import req from 'superagent'
const options = [  { key: 'm',text: 'M a l e', value: 'male', icon: "man"}, {key: 'f', text: 'F e m a l e', value: 'female', icon: "woman"}]

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      buttonStatus: true,
      firstName:'',
      lastName:'',
      email:'',
      mobile:0,
      password:'',
      rePassword:'',
      disable:true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateForm() {
    if (this.state.firstName == '' || this.state.firstName == null ||
        this.state.lastName == '' || this.state.lastName == null ||
        this.state.email == '' || this.state.email == null ||
        this.state.mobile == '' || this.state.mobile == null ||
        this.state.password == '' || this.state.password == null ||
        this.state.rePassword == '' || this.state.rePassword == null)
        {
          this.setState({disable: true})
        } else {
            this.setState({disable: false})
          }
  }

  fname(event) {
    this.setState({firstName: event.target.value});
    this.validateForm();
  }

  lname(event) {
    this.setState({lastName: event.target.value});
    this.validateForm();
  }

  email(event) {
    this.setState({email: event.target.value});
    this.validateForm();
  }

  mobile(event) {
    this.setState({mobile: event.target.value});
    this.validateForm();
  }

  password(event) {
    this.setState({password: event.target.value});
    this.validateForm();
  }

  rePassword(event) {
    this.setState({rePassword: event.target.value});
    this.validateForm();
  }

  handleSubmit() {
    let context = this;
    if(this.state.password == this.state.rePassword ){
    var signupForm = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'email': this.state.email,
      'mnum': this.state.mobile,
      'password': this.state.password
    }
    console.log(signupForm);
    req.post('/register')
        .query({signupForm})
        .end((err, res)=>{
          console.log(res);
          if (err) {
            console.log('err to Register user ', err);
          }
          else{
            if(res.text=="Email Already present"){
              alert("Email is already registered");
            }
            else{
            context.props.handleClick1();
            }
          }
        });
        // alert('You have signed up successfully');
        // this.props.handleClick.bind(this,0);
        }
        else{
          alert('Password and confirm password should be same');
        }
  }
  checkPassword() {
    var password = this.state.password;
    if (password.match("^[A-Za-z]+[0-9]+$")) {} else {
      alert('Password should be alphanumeric')
    }
  }
  checkRePassword() {
    var password = this.state.password;
    var rePassword = this.state.rePassword;
    console.log(password);
    console.log(rePassword);
    if (password != rePassword) {
      alert('Password and Confirm Password should be same');
    } else {}
  }

    render() {
    return (
      <Segment style={{height:"500px"}} inverted>
        <Image fluid style={{position: "absolute", left: 0, top: 0, height:"500px"}} src="http://res.cloudinary.com/stackroute/image/upload/v1504098478/stones_v3fizh.jpg"/>
        <Grid textAlign='center'  style={{marginTop:"15px"}} >
          <Grid.Column style={{ maxWidth: 450 }}>
          <Segment className="SignUpSegment" style={{color:"white"}}>
            <Header as='h2' color='teal' textAlign='center'> {' '}SignUp
            </Header>
            <br/>
            <br/>
            <Form size='large' onSubmit={this.handleSubmit}>
            <Form.Group widths='equal' inline>
                <Form.Input inverted transparent fluid icon='user' iconPosition='left' placeholder='First Name' type='text' onChange={this.fname.bind(this)} required={true}/>
              <Form.Input inverted transparent fluid icon='user' iconPosition='left' placeholder='Last Name' type='text' onChange={this.lname.bind(this)} required={true}/>
            </Form.Group>
                <br/>
              <Form.Input inverted transparent fluid icon='mail' iconPosition='left' placeholder='E-mail address' type='email' onChange={this.email.bind(this)} required={true}/>
                <br/>
                <Form.Group unstackable widths={2} inline>
                <Form.Input inverted transparent fluid icon='phone' iconPosition='left' placeholder='Mobile' type='Number' onChange={this.mobile.bind(this)} required={true}/>
                <Dropdown inline options={options} defaultValue={options[0].value} />
                </Form.Group>
                <br/>
                <Form.Group widths='equal' inline>
                <Form.Input inverted transparent fluid icon='lock' iconPosition='left' placeholder='Password' type='password' onChange={this.password.bind(this)} required={true}/>
              <Form.Input inverted transparent fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' onChange={this.rePassword.bind(this)} required={true}/>
                </Form.Group>
                <br/>
                <Button type="submit" value="Submit" color='teal' fluid size='medium' disabled={this.state.disable}>Register</Button>
                <br/>
            </Form>
            <Button color='grey' fluid size='medium' onClick={this.props.handleClick.bind(this,0)}><Icon name='reply' />Already A User !</Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}
