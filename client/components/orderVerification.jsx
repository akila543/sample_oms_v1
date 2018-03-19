import React from 'react';
import {Table, Button, Icon, Grid, Header} from 'semantic-ui-react';

import {connect} from 'react-redux';
import cartItemRemover from './../../redux/actions/cartItemRemover.js';
import handleCartIncreament from './../../redux/actions/cartItemIncreamentor.js';
import handleCartDecreament from './../../redux/actions/cartDecreamentor.js';
import {Link} from 'react-router';


import {bindActionCreators} from 'redux';

 class OrderVerification extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      productTable: [],
      cartItem:[],
      counter:1
    }
  }
  componentDidMount()
  {
    var totalCost=0,cartArray = [];
    cartArray.push(this.props.cartData.cartItems.map((item, i) => {
      totalCost+=parseInt(item.purchasedCost);
      return (
        <Table.Row key={i}>
          <Table.Cell>{item.productName}</Table.Cell>
          <Table.Cell>
            <div>
            <Button color='orange' icon  style={{
              marginLeft: "10px"
            }} size="tiny" onClick={()=>this.props.handleDecreament(this.props.cartItem,i)}>
              <Icon name='minus'/>
            </Button>
              {item.productQuantity}
              <Button primary icon style={{
                marginRight: "10px"
              }} size="tiny" onClick={()=>this.props.handleIncreament(this.props.cartItem,i)}>
                <Icon name='add'/>
              </Button>
            </div>
          </Table.Cell>
          <Table.Cell>{item.offerPrice}</Table.Cell>
          <Table.Cell>{item.purchasedCost}</Table.Cell>
          <Table.Cell >
            <Button color='grey' icon  onClick={()=>this.props.handleRemoveItem(this.props.cartItem,i)}>
              <Icon name='remove'/>
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    }));
    this.setState({productTable: cartArray,totalAmount:totalCost});
  }
  render()
  {
    var totalCost = 0;
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <Header as='h3' block inverted style={{
              marginTop: "25px"
            }}>
              Shopping Cart
            </Header>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product Name</Table.HeaderCell>
                  <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Product Price</Table.HeaderCell>
                  <Table.HeaderCell>Total Amount</Table.HeaderCell>
                <Table.HeaderCell >Delete Product</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.cartData.cartItems.map((item, i) => {
                  totalCost+=parseInt(item.purchasedCost);
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>{item.productName}</Table.Cell>
                      <Table.Cell>
                        <div>
                          <Button icon color='blue' style={{
                            marginRight: "10px"
                          }} size="tiny" onClick={()=>this.props.handleCartDecreament(i)}>
                            <Icon name='minus'/>
                          </Button>
                          {item.productQuantity}
                          <Button icon color='orange' style={{
                            marginLeft: "10px"
                          }} size="tiny" onClick={()=>this.props.handleCartIncreament(i)}>
                            <Icon name='add'/>
                          </Button>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{item.offerPrice}</Table.Cell>
                      <Table.Cell>{item.purchasedCost}</Table.Cell>
                      <Table.Cell >
                        <Button icon color='grey' onClick={()=>this.props.cartItemRemover(i)}>
                          <Icon name='remove'/>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <center>
              <Link to={"http://localhost:1100/buyProduct"}>
            <Button animated='fade'>
              <Button.Content visible>
                Checkout Cart
              </Button.Content>
              <Button.Content hidden>
                <Icon name='rupee' />{totalCost}
              </Button.Content>
            </Button>
          </Link>
          </center>
          </Grid.Column>
        </Grid>
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

function matchDispatchToProps(dispatch)
{
  return bindActionCreators({
    cartItemRemover:cartItemRemover,
    handleCartIncreament:handleCartIncreament,
    handleCartDecreament:handleCartDecreament
  },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(OrderVerification)
