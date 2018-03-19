import React from 'react';
import {
  Grid,
  Image,
  Header,
  Rating,
  Statistic,
  Divider,
  Segment,
  Icon,
  Popup,
  List,
  Button
} from 'semantic-ui-react';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cartHandler from './../../redux/actions/cartHandler.js';


class PurchaseProduct extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      img: 'http://res.cloudinary.com/stackroute/image/upload/'
    }
    this.addItemsToCart = this.addItemsToCart.bind(this);
  }

  addItemsToCart(item)
  {
    if(this.checkDuplicate(this.props.cartData.cartItems,item) == false)
    {
      this.props.cartHandler(item);
      window.location = "http://localhost:1100/#/cartItem";
    }
    else
      window.location = "http://localhost:1100/#/cartItem";
  }
  checkDuplicate(arr, val) {
  return arr.some(function(arrVal) {
    return val.productName === arrVal.productName;
  });
}
  render()
  {
    console.log(this.props.cartData.selectedItem);
    return (
      <div style={{
        marginTop: "35px"
      }}>
        <Grid divided style={{
          marginRight: "10px",
          marginLeft: "10px"
        }}>
          <Grid.Row>
            <Grid.Column width={7}>
              <Reveal effect="animated fadeInLeft">
                <div>
                  <center>
                    <Image label={{
                      as: 'tag',
                      color: 'red',
                      content: this.props.cartData.selectedItem.offerPrice,
                      icon: 'rupee',
                      ribbon: true,
                      size: "huge"
                    }} src={this.state.img + '/' + this.props.cartData.selectedItem.imgId +'/'+this.props.cartData.selectedItem.imgName}/>
                  </center>
                </div>
                <div style={{
                  marginTop: "25px"
                }}>
                  <center>
                    <Button.Group size="big">
                      <Button color='orange' onClick={() => this.addItemsToCart(this.props.cartData.selectedItem)}>Buy Now</Button>
                      <Button.Or/>
                    <Button color='red' onClick={() => this.props.cartHandler(this.props.cartData.selectedItem)}>Add to Cart</Button>
                    </Button.Group>
                  </center>
                </div>
              </Reveal>
            </Grid.Column>
            <Grid.Column width={9}>
              <Reveal effect="animated fadeInRight">
                <div>
                  <Header as='h4' block inverted>
                    {this.props.cartData.selectedItem.productName}
                  </Header>
                </div>
                <div style={{
                  float: "left",
                  marginTop: "20px",
                  marginLeft: "25px"
                }}>
                  <Rating defaultRating={3} maxRating={5} disabled/>
                </div>
                <div style={{
                  marginTop: "10px",
                  marginLeft: "135px"
                }}>
                  <Statistic value='5,500' label='Customer Ratings' size="mini" color='red'/>
                  <Statistic value='3,750' label='Customer Reviews' size="mini" color='red'/>
                </div>
                <Divider/>
                <div style={{
                  marginLeft: "35px"
                }}>
                  <Statistic color='teal' size="tiny">
                    <Statistic.Value >
                      <Icon name='rupee'/>{this.props.cartData.selectedItem.offerPrice}
                    </Statistic.Value>
                    <Statistic.Label style={{
                      marginTop: "5px"
                    }}>
                      <strike>
                        <Icon name='rupee' size="large" style={{
                          marginTop: "-4px"
                        }}/>
                        <span style={{
                          fontSize: "15px"
                        }}>{this.props.cartData.selectedItem.Mrp}</span>
                      </strike>
                    </Statistic.Label>
                  </Statistic>
                </div>
                <div style={{
                  marginTop: "15px"
                }}>
                  <div>
                    <Icon name="tag" size="large" color="orange"/>
                    <span style={{
                      fontWeight: "bold",
                      fontSize: "17px",
                      paddingRight: "5px",
                      paddingLeft: "5px"
                    }}>Special Price Flat
                    </span>
                    <span style={{
                      fontSize: "16px"
                    }}>₹ {parseInt(this.props.cartData.selectedItem.Mrp) - parseInt(this.props.cartData.selectedItem.offerPrice)}
                      Off On {this.props.cartData.selectedItem.productName}
                      T&C</span>
                  </div>
                </div>
                <Divider/>
                <div style={{
                  marginLeft: "35px"
                }}>
                  <span style={{
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}>EMI</span>
                  <span style={{
                    fontSize: "16px",
                    paddingRight: "5px"
                  }}>
                    starts from
                    <Icon name='rupee'/>2069</span>
                  <Popup trigger={< Icon name = 'info circle' color = 'red' size = 'large' style = {{marginTop:"-5px"}}/>} content='I am positioned to the bottom center' position='bottom center'/>
                  <br/>
                  <span style={{
                    color: "green",
                    fontSize: "18px"
                  }}>In Stock</span>
                </div>
                <Divider/>
                <div style={{
                  marginLeft: "35px"
                }}>
                  <span style={{
                    fontSize: "20px",
                    fontWeight: "bold"
                  }}>Specifications</span>
                  <br/>
                  <List bulleted style={{
                    marginLeft: "45px"
                  }}>
                    <List.Item>18 megapixel CMOS (APS-C) sensor</List.Item>
                    <List.Item>14-bit A/D conversion</List.Item>
                    <List.Item>9-point all cross-type AF system (including a high-precision dual-cross f/2.8 center point)</List.Item>
                    <List.Item>ISO 100-12800 (expandable to H: 25600)</List.Item>
                    <List.Item>EOS full HD movie mode with movie servo</List.Item>
                    <List.Item>Vari-angle touchscreen 3-inch clear view LCD monitor II</List.Item>
                    <List.Item>Includes Canon EF-S 18-55mm f/3.5-5.6 IS II lens, Canon EF-S 55-250mm f/4-5.6 IS II lens, Canon battery LP-E8, Canon battery charger LC-E8E</List.Item>
                    <List.Item>Also includes wide strap, USB cable, software CD, manual, 8GB SDHC class 10 in the box</List.Item>
                    <List.Item>2 years Canon India warranty card</List.Item>
                    <List.Item>Camera bag (packed separately)</List.Item>
                  </List>
                </div>
              </Reveal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {cartData: state.cartData}
}

function matchDispatchToProps(dispatch)
{
  return bindActionCreators({cartHandler:cartHandler},dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(PurchaseProduct);
