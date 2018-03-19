import React from 'react';
import { Card,Grid, Image,Icon } from 'semantic-ui-react';
import HeaderComponent from './headerComponent.jsx';
import Reveal from 'react-reveal';
import 'animate.css/animate.css';
export default class ProductsByCategory extends React.Component
{
  render()
  {
    return(
      <Reveal ssr effect="animated fadeInRight">
      <div>
          <div className="ProductsByCategoryHeader" style={{marginTop:"30px",marginBottom:"25px"}}>
            <HeaderComponent heading="Products by Category" />
          </div>
          <div className="ProductsByCategory" style={{marginLeft:"15px"}}>
              <Grid relaxed columns={4}>
                  <Grid.Row columns={4}>
                      <Grid.Column>
                          <Card>
                              <Image src='http://res.cloudinary.com/stackroute/image/upload/v1504011227/shirt_ethetz.jpg' />
                              <Card.Content>
                                <Card.Header>
                                  Men's Clothing
                                </Card.Header>
                                <Card.Description>
                                Deals on Men's Clothing
                                </Card.Description>
                              </Card.Content>
                        </Card>
                      </Grid.Column>
                      <Grid.Column>
                      <Card>
                          <Image src='http://res.cloudinary.com/stackroute/image/upload/v1504011269/shoe_izlr7j.jpg' />
                          <Card.Content>
                            <Card.Header>
                              Shoes
                            </Card.Header>
                            <Card.Description>
                              Deals on Shoes
                            </Card.Description>
                          </Card.Content>
                    </Card>
                      </Grid.Column>
                      <Grid.Column>
                      <Card>
                          <Image src='http://res.cloudinary.com/stackroute/image/upload/v1504011322/ket_a12zy8.jpg' />
                          <Card.Content>
                            <Card.Header>
                              House Appliances
                            </Card.Header>
                            <Card.Description>
                              Deals on House Appliances
                            </Card.Description>
                          </Card.Content>
                    </Card>
                      </Grid.Column>
                      <Grid.Column>
                      <Card>
                          <Image src='http://res.cloudinary.com/stackroute/image/upload/v1504011362/watch_dhx0gs.jpg' />
                          <Card.Content>
                            <Card.Header>
                              Watches
                            </Card.Header>
                            <Card.Description>
                              Deals on Watches
                            </Card.Description>
                          </Card.Content>
                    </Card>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </div>
      </div>
      </Reveal>
    );
  }
}
