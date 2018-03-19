import React from 'react';
import Carousel from './../components/carosel.jsx';
import AppBar from './../components/appBar.jsx';
import MenuBar from './../components/menuBar.jsx';
import TrendingProducts from './../components/trendingProducts.jsx';
import ProductPoster from './../components/productPoster.jsx';
import ProductsByCategory from './../components/productByCategories.jsx';
import FollowUs from './../components/followUs.jsx';
import Footer from './../components/footer.jsx'
import Request from 'superagent';
export default class HomePage extends React.Component
{
  constructor()
  {
    super();
  }

  render()
  {
    return(
      <div className="HomePage" style={{marginTop:"110px"}}>
        < Carousel />
        < TrendingProducts />
        < ProductPoster />
        < ProductsByCategory />
        < FollowUs />
        < Footer />
      </div>
    );
  }
}
