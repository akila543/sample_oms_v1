import React from 'react'
import {
  Step,
  Button,
  Segment,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Grid,
  Header,
  Label,
  Icon,
  Menu,
  Table,
  Divider,
  Modal,
  Dimmer,
  Loader,
  Image
} from 'semantic-ui-react';
import SwipeableViews from 'react-swipeable-views';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import request from 'superagent';
import {connect} from 'react-redux';
class ProductConfirmationSlider extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      finalOrder:{},
      slideIndex: 0,
      firstName: '',
      lastName: '',
      phone: '',
      eMail: '',
      state: '',
      city: '',
      pin: '',
      landMark: '',
      lat: '',
      lng: '',
      disable: false,
      deliveryCostTable: [],
      totalAmount: 0,
      deliveryCost: 0,
      modalOpen: false,
      activateDimmer:true,
      modalOpen: false,
      flag1:true,
      flag2:false
      // orderDetails:{}


    }
    this.handleResult = this.handleResult.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    this.setState({modalOpen: true});
  }
  handleClose() {
    this.setState({modalOpen: false});
  }

  componentDidMount()
  {
    var amount = 0,
      deliveryCostTable = [];
    //console.log('@@@@@',this.props.selectedProduct[0]);
    deliveryCostTable.push(this.props.cartData.cartItems.map((item, i) => {
      console.log('item---->', item);
      amount += parseInt(item.purchasedCost);
      return (
        <Table.Row key={i}>
          <Table.Cell >{item.productName}</Table.Cell>
          <Table.Cell >{item.productQuantity}</Table.Cell>
          <Table.Cell >₹ {item.offerPrice}</Table.Cell>
        </Table.Row>
      );
    }));
    this.setState({deliveryCostTable: deliveryCostTable, totalAmount: amount});
  }
  validateForm() {
    if (this.state.firstName == '' || this.state.firstName == null || this.state.lastName == '' || this.state.lastName == null) {
      this.setState({disable: true})
    } else {
      this.setState({disable: false})
    }
  }
  handleFirstName(e)
  {
    this.setState({firstName: e.target.value});
    this.validateForm();
  }
  handleLastName(e)
  {
    this.setState({lastName: e.target.value});
    this.validateForm();
  }
  handlePhone(e)
  {
    this.setState({phone: e.target.value});
  }
  handleEmail(e)
  {
    this.setState({eMail: e.target.value});
  }
  handleState(e)
  {
    this.setState({state: e.target.value});
  }
  handleStreet(e)
  {
    this.setState({street: e.target.value});
  }
  handleCity(e)
  {
    this.setState({city: e.target.value});
  }
  handlePinCode(e)
  {
    this.setState({pin: e.target.value});
  }
  handleLandMark(e)
  {
    this.setState({landMark: e.target.value});
  }

  handleFinalOrder()
  {
    console.log("inside handle final order in ui");
    console.log('finalOrder - > ',this.state.finalOrder, typeof this.state.finalOrder);
    request.post('/finalOrder')
            .query({finalOrder:JSON.stringify(this.state.finalOrder)})
            .end((err, res) => {
      if (err) {
        console.log('err in results route ', err);
      } else {
          console.log(res.text+"res from final order");
      }
    });
  }
  handleSubmit(e)
  {
    this.setState({slideIndex: 1});
    this.setState({flag1: false});
    this.setState({flag2: true});
    console.log('---------final------',this.props.cartData.cartItems);
    var orderDetails = {
      'products': [this.props.cartData.cartItems],
      'customerInfo': {
        'customerId': '',
        'firstName': this.state.firstName,
        'lastName': this.state.lastName,
        'mobile': this.state.phone,
        'eMail': this.state.eMail,
        'address': {
          'street': this.state.street,
          'landMark': this.state.landMark,
          'city': this.state.city,
          'state': this.state.state,
          'pincode': this.state.pin
        }
      }
    };
    var status = {
      'placed' : false,
      'shipped' : false,
      'delivered' : false
    };
    this.setState({orderDetails:orderDetails});
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + JSON.stringify(this.state.pin) + '&key=AIzaSyA7w_ZiVwAwN6_LdKQyMrKbAQI611QA68o').end((err, res) => {
      if (err) {
        console.log(err);
      }
      this.setState({
        lat: JSON.parse(res.text).results[0].geometry.location.lat,
        lng: JSON.parse(res.text).results[0].geometry.location.lng
      });
      if ((this.state.lat > 0.0) && (this.state.lng > 0.0)) {
        console.log('lat in if - > ', this.state.lat);
        console.log('lng in if - > ', this.state.lng);
        request.post('/orders').query({lat: this.state.lat, lng: this.state.lng, orderDetails: JSON.stringify(orderDetails), status: JSON.stringify(status)}).end((err, res) => {
          if (err)
            console.log(err);
          console.log('backend - > ', res.text);
          if (res.text === "All fine") {
            this.handleResult();
          }

        });
      }
    });
  }
  handleResult()
  {
    console.log('called');
    request.get('/finalResult').end((err, res) => {
      if (err) {
        console.log('err in results route ', err);
      } else {

        console.log('inside res');
        console.log(res.text,typeof res.text,"response from handle result");
        // var x=this.state.orderDetails;
        // x.status.placed=true;
        // console.log(x,"value of x in handle result");
        this.setState({
          deliveryCost: JSON.parse(res.text).deliverycost,
          activateDimmer:false,
          finalOrder:JSON.parse(res.text),
          // orderDetails:x
        });

      }
    });
    return 0;
  }
  render()
  {
    return (
      <div>
        <Reveal effect="animated fadeInUp">
          <div style={{
            marginTop: "115px"
          }}>
            <center>
              <Step.Group style={{
                width: "49%"
              }} stackable='tablet' size="small">
                <Step icon='truck' title='Shipping' description='Choose your shipping options' active={this.state.flag1}/>
              <Step icon='info circle' title='Confirm Order' description='Verify order details'active={this.state.flag2}/>
              </Step.Group>
            </center>
          </div>
          <div style={{
            marginTop: "15px"
          }}>
            <Grid centered columns={2}>
              <Grid.Column >

                <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>

                  <div style={{
                    height: "100%",
                    width: "100%"
                  }}>
                    <Segment>
                      <Form>
                        <Segment className="ShippingSegment">
                          <Header as='h2' className="HeaderStyle">
                            {' '}Personal Information
                          </Header>
                          <Form.Group>

                            <Form.Field width={8} control={Input} icon="user" iconPosition="left" placeholder='First name' onChange={this.handleFirstName.bind(this)}/>
                            <Form.Field width={8} control={Input} icon="user" iconPosition="left" placeholder='Last name' onChange={this.handleLastName.bind(this)}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.Field width={8} control={Input} icon="phone" iconPosition="left" placeholder='mobile no' onChange={this.handlePhone.bind(this)}/>
                            <Form.Field width={8} control={Input} icon="mail" iconPosition="left" placeholder='email' onChange={this.handleEmail.bind(this)}/>
                          </Form.Group>
                        </Segment>
                        <Segment className="ShippingSegment">
                          <Header as='h2'>
                            {' '}Address Details
                          </Header>

                          <Form.Field control={Input} icon="street view" iconPosition="left" placeholder='Street' onChange={this.handleStreet.bind(this)}/>
                          <Form.Group>
                            <Form.Field width={8} control={Input} icon="building" iconPosition="left" placeholder='Landmark' onChange={this.handleLandMark.bind(this)}/>
                            <Form.Field width={8} control={Input} icon="home" iconPosition="left" placeholder='City' onChange={this.handleCity.bind(this)}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.Field width={8} control={Input} icon="home" iconPosition="left" placeholder='State' onChange={this.handleState.bind(this)}/>
                            <Form.Field width={8} control={Input} icon="home" iconPosition="left" placeholder='Pincode' onChange={this.handlePinCode.bind(this)}/>
                          </Form.Group>
                        </Segment>
                        <center>
                          <Form.Field control={Button} disabled={this.state.disable} primary onClick={this.handleSubmit.bind(this)}>Proceed</Form.Field>
                        </center>
                      </Form>
                    </Segment>
                  </div>

                  <div style={{
                    height: "100%",
                    width: "100%"
                  }}>
                    <Segment>
                      <Segment className="ShippingSegment">
                        <Dimmer active={this.state.activateDimmer}>

                          <Loader/>

                        </Dimmer>
                        <center>
                          <Header as='h1' className="HeaderStyle">
                            {' '}Thank You for your Order</Header>
                          <Header as='h2' className="HeaderStyle">
                            {' '}Your Order Summary</Header>
                        </center>
                        <hr/>
                        <p>Order Number: #959647063</p>
                        <Table stackable color={"red"}>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Name</Table.HeaderCell>
                              <Table.HeaderCell>Quantity</Table.HeaderCell>
                              <Table.HeaderCell>Price</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {console.log('over')}
                            {this.state.deliveryCostTable}

                            <Table.Row></Table.Row>
                            <Table.Cell></Table.Cell>
                            <Table.Cell negative>Total Product Prices</Table.Cell>
                            <Table.Cell negative>₹{this.state.totalAmount}</Table.Cell>
                            <Table.Row>
                              <Table.Cell></Table.Cell>
                              <Table.Cell negative>Delivery Cost</Table.Cell>
                              <Table.Cell negative>₹ {this.state.deliveryCost}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell></Table.Cell>
                              <Table.Cell negative>Final Amount</Table.Cell>
                              <Table.Cell negative>₹ {this.state.totalAmount + this.state.deliveryCost}</Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                        <br/>
                        <center>
                          <Modal trigger={< Button primary onClick = {
                            this.handleOpen
                          } > <Icon name='payment'/>Proceed to Payment < /Button>} open={this.state.modalOpen} onClick={this.handleFinalOrder.bind(this)} onClose={this.handleClose} basic size='small'>
                            <Modal.Content>
                              <h3>The order is ready, you can pay it later !!</h3>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button color='green' onClick={this.handleClose} inverted>
                                <Icon name='checkmark'/>
                                Got it
                              </Button>
                            </Modal.Actions>
                          </Modal>
                        </center>
                        <br/>
                        <center>
                          <Header as='h3' style={{
                            width: "75%"
                          }}>This order is subjected to ORS
                            <i style={{
                              color: "red"
                            }}>
                              Terms Of Service</i>,
                            <i style={{
                              color: "red"
                            }}>
                              Private Policy
                            </i>
                            and
                            <i style={{
                              color: "red"
                            }}>
                              Cookie Policy</i>
                          </Header>
                        </center>
                      </Segment>
                    </Segment>
                  </div>
                </SwipeableViews>
              </Grid.Column>
            </Grid>
          </div>
        </Reveal>
      </div>
    );
  }
}


function mapStateToProps(state)
{
  return{
    cartData:state.cartData
  }
}


export default connect(mapStateToProps)(ProductConfirmationSlider);
