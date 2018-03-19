import React from 'react';
import {
  Grid,
  Image,
  Header,
  Card,
  Icon,
  Rating,
  Statistic,
  Button
} from 'semantic-ui-react';
import HeaderComponent from './headerComponent.jsx';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import cartHandler from './../../redux/actions/cartHandler.js';
import selectedProductHandler from './../../redux/actions/selectedProductHandler.js';
import {bindActionCreators} from 'redux';

class Deals extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      selectedproduct: [],
      cartNo: ''
    }
    this.handleCart = this.handleCart.bind(this);
    this.handleSelectedProduct = this.handleSelectedProduct.bind(this);
    this.addItemsToCart = this.addItemsToCart.bind(this);
  }
  addItemsToCart(item)
  {
    if(this.checkDuplicate(this.props.cartData.cartItems,item) == false)
    {
      this.props.cartHandler(item);
    }
  }

  checkDuplicate(arr, val) {
  return arr.some(function(arrVal) {
    return val.productName === arrVal.productName;
  });
}
  handleSelectedProduct(item)
  {
    this.props.selectedProductHandler(item);
    window.location = "http://localhost:1100/#/productInformation";
  }
  handleCart(cart)
  {
    this.props.cartCounter += 1;
    console.log(this.props.cartCounter);
  }
  render()
  {
    return (
      <Reveal effect="animated fadeInUp">
        <div>
          <div style={{
            marginTop: "25px",
            marginBottom: "25px"
          }}>
            <HeaderComponent heading="Deals of the Day"/>
          </div>
          <div>
            <Grid columns={5} divided padded>
              {this.props.productData.map((item, i) => {
                return (
                  <Grid.Column key={i}>
                    <Card>
                      <Image src={'http://res.cloudinary.com/stackroute/image/upload/' + item.imgId + '/' + item.imgName} onClick={() => this.handleSelectedProduct(item)} className="ImagePointer"/>
                      <Card.Content>
                        <Card.Header>
                          {item.productName}
                        </Card.Header>
                        <Card.Meta>
                          <span className='rating'>
                            <Rating defaultRating={item.productRating} maxRating={5} disabled/>
                          </span>
                        </Card.Meta>
                        <Card.Description>
                          <center>
                            <Statistic color='teal' size="tiny">
                              <Statistic.Value >
                                <Icon name='rupee'/>{item.offerPrice}
                              </Statistic.Value>
                              <Statistic.Label >
                                <strike>
                                  <Icon name='rupee'/>{item.Mrp}
                                </strike>
                              </Statistic.Label>
                            </Statistic>
                          </center>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <center>
                          <Button basic color="red" animated='vertical' onClick={() => this.addItemsToCart(item)}>
                            <Button.Content hidden>
                              <Icon name='shop'/>
                            </Button.Content>
                            <Button.Content visible>
                              Add to Cart
                            </Button.Content>
                          </Button>
                        </center>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid>
          </div>
        </div>
      </Reveal>
    );
  }
}

function mapStateToProps(state) {
  return {productData: state.dealsProductData,
          cartData:state.cartData}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    cartHandler: cartHandler,
    selectedProductHandler: selectedProductHandler
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Deals);
