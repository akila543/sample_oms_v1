import React from 'react';
import Request from 'superagent';

export default class Product extends React.Component{
  constructor(){
    super();
    this.state={
      productId : '',
      productName : '',
      productImageUrl : '',
      productBrand : '',
      productPrice : 0.0,
      productCategory : '',
      productSubCategory : '',
      productDescription : ''
    }
    this.handleProductId=this.handleProductId.bind(this);
    this.handleProductName=this.handleProductName.bind(this);
    this.handleProductImageUrl=this.handleProductImageUrl.bind(this);
    this.handleProductBrand=this.handleProductBrand.bind(this);
    this.handleProductPrice=this.handleProductPrice.bind(this);
    this.handleProductCategory=this.handleProductCategory.bind(this);
    this.handleProductSubCategory=this.handleProductSubCategory.bind(this);
    this.handleProductDescription=this.handleProductDescription.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleProductId(e){
    this.setState({productId:e.target.value});
  }
  handleProductName(e){
    this.setState({productName:e.target.value});
  }
  handleProductImageUrl(e){
    this.setState({productImageUrl:e.target.value});
  }
  handleProductBrand(e){
    this.setState({productBrand:e.target.value});
  }
  handleProductPrice(e){
    this.setState({productPrice:e.target.value});
  }
  handleProductCategory(e){
    this.setState({productCategory:e.target.value});
  }
  handleProductSubCategory(e){
    this.setState({productSubCategory:e.target.value});
  }
  handleProductDescription(e){
    this.setState({productDescription:e.target.value});
  }
  handleSubmit(){
    var productId=this.state.productId
      , productName=this.state.productName
      , productImageUrl=this.state.productImageUrl
      , productBrand=this.state.productBrand
      , productPrice=this.state.productPrice
      , productCategory=this.state.productCategory
      , productSubCategory=this.state.productSubCategory
      , productDescription=this.state.productDescription;

    this.setState({productId:'', productName:'', productImageUrl:'', productBrand:'', productPrice:0.0, productCategory:'', productSubCategory:'', productDescription:''});
    Request.get('http://localhost:1538/product')
            .query({
              productId:productId,
              productName:productName,
              productImageUrl:productImageUrl,
              productBrand:productBrand,
              productPrice:productPrice,
              productCategory:productCategory,
              productSubCategory:productSubCategory,
              productDescription:productDescription
            })
            .end((err, res)=>{
              if (err) {
                console.log('err in response from localhost:1538/product  - > ',err);
              } else {
                console.log('response from localhost:1538/product  - > ',res);
              }
            });
  }
  render(){
    return(
      <div>
        <h1>Enter Product Data</h1>
        <br />
        <input type='text' placeholder='productId' onChange={this.handleProductId}/>
        <input type='text' placeholder='productName' onChange={this.handleProductName}/>
        <input type='text' placeholder='productImageUrl' onChange={this.handleProductImageUrl}/>
        <input type='text' placeholder='productBrand' onChange={this.handleProductBrand}/>
        <input type='text' placeholder='productPrice' onChange={this.handleProductPrice}/>
        <input type='text' placeholder='productCategory' onChange={this.handleProductCategory}/>
        <input type='text' placeholder='productSubCategory' onChange={this.handleProductSubCategory}/>
        <input type='text' placeholder='productDescription'onChange={this.handleProductDescription} />
        <input type='submit' value='submit' onClick={this.handleSubmit}/>
      </div>
    );
  }
}
