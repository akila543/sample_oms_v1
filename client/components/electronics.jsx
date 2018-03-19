import React, {Component} from 'react'
import {
  Grid,
  Menu,
  Segment,
  Card,
  Rating,
  Statistic,
  Icon,
  Button,
  Image
} from 'semantic-ui-react'
import HeaderComponent from './headerComponent.jsx';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import cartHandler from './../../redux/actions/cartHandler.js';
import {bindActionCreators} from 'redux';
import selectedProductHandler from './../../redux/actions/selectedProductHandler.js';

class Electronics extends Component {
  constructor()
  {
    super();
    this.state = {
      activeItem: 'mobiles',
      pdtDetails: []
    }
    this.handleSelectedProduct = this.handleSelectedProduct.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
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
  componentDidMount()
  {
    var template = [];
    template.push(this.props.productData.map((item, i) => {
      if (item.itemCategory == 'mobiles')
        return (
          <Grid.Column key={i}>
            <Card >
              <Link to={'/productInformation'}>
                <Image src={'http://res.cloudinary.com/stackroute/image/upload/' + item.imgId + '/' + item.imgName} onClick={()=>this.handleSelectedProduct(item)}/></Link>
              <Card.Content>
                <Card.Header>
                  {item.productName}
                </Card.Header>
                <Card.Meta>
                  <span className='rating'>
                    <Rating defaultRating={item.pdtRating} maxRating={5} disabled/>
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
      }
    ))
    this.setState({pdtDetails: template});
  }
  handleItemClick(e, {name}) {
    this.setState({activeItem: name})
    console.log(name);

    var template = [];
    template.push(this.props.productData.map((item, i) => {
      if (item.itemCategory == name) {
        return (
          <Reveal effect="animated fadeInUp">
            <Grid.Column key={i}>
              <Card>
                <Link to={'/productInformation'}>
                  <Image src={'http://res.cloudinary.com/stackroute/image/upload/' + item.imgId + '/' + item.imgName} onClick={()=>this.handleSelectedProduct(item)}/></Link>
                <Card.Content>
                  <Card.Header>
                    {item.productName}
                  </Card.Header>
                  <Card.Meta>
                    <span className='rating'>
                      <Rating defaultRating={item.pdtRating} maxRating={5} disabled/>
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
          </Reveal>

        );
      }
    }))
    this.setState({pdtDetails: template});
  }

  render() {
    const {activeItem} = this.state
    return (
      <Reveal effect="animated fadeInUp">
        <Grid style={{
          marginTop: "100px"
        }}>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name='mobiles' active={activeItem === 'mobiles'} onClick={this.handleItemClick} className="MenuBarMenuItem"/>
              <Menu.Item name='laptop' active={activeItem === 'laptop'} onClick={this.handleItemClick} className="MenuBarMenuItem"/>
              <Menu.Item name='camera' active={activeItem === 'camera'} onClick={this.handleItemClick} className="MenuBarMenuItem"/>
              <Menu.Item name='computer peripherals' active={activeItem === 'computer peripherals'} onClick={this.handleItemClick} className="MenuBarMenuItem"/>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <Grid columns={4} divided padded>
              {this.state.pdtDetails}
            </Grid>
          </Grid.Column>
        </Grid>
      </Reveal>
    )
  }
}

function mapStateToProps(state) {
  return {productData: state.electronicsProductData,cartData:state.cartData}
}

function matchDispatchToProps(dispatch)
{
  return bindActionCreators({
    cartHandler:cartHandler,
    selectedProductHandler:selectedProductHandler
  },dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(Electronics);
