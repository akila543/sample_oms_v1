import React from 'react';
import Request from 'superagent';

export default class Dc extends React.Component{
  constructor(){
    super();
    this.state={
      dcId : '',
      dcName : '',
      lng : 0.0,
      lat : 0.0
    }
    this.handleDcId=this.handleDcId.bind(this);
    this.handleDcName=this.handleDcName.bind(this);
    this.handleDcLng=this.handleDcLng.bind(this);
    this.handleDcLat=this.handleDcLat.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleDcId(e){
    this.setState({dcId:e.target.value});
    console.log(this.state.dcId);
  }
  handleDcName(e){
    this.setState({dcName:e.target.value});
    console.log(this.state.dcName);
  }
  handleDcLng(e){
    this.setState({lng:e.target.value});
    console.log(this.state.lng);
  }
  handleDcLat(e){
    this.setState({lat:e.target.value});
    console.log(this.state.lat);
  }
  handleSubmit(){
    var arr = [];
    arr[0]=this.state.lng;
    arr[1]=this.state.lat;
    var dcLocation = {
      type : "Point",
      coordinates : arr
    }
      , dcId = this.state.dcId
      , dcName = this.state.dcName;
    Request.get('http://localhost:1538/dc')
            .query({
              dcId:dcId,
              dcName:dcName,
              dcLocation:dcLocation
            })
            .end((err, res)=>{
              if (err) {
                console.log('err in response from localhost:1538/dc  - > ',err);
              } else {
                console.log('response from localhost:1538/dc  - > ',res);
              }
            });
    this.setState({dcId:'',dcName:'',lng:0.0,lat:0.0});
  }
  render(){
    return(
      <div>
        <h1>Enter DC Data</h1>
        <br />
        <input type='text' placeholder='dcId' onChange={this.handleDcId}/>
        <input type='text' placeholder='dcName' onChange={this.handleDcName}/>
        <input type='text' placeholder='Longitude' onChange={this.handleDcLng}/>
        <input type='text' placeholder='Lattitude' onChange={this.handleDcLat}/>
        <input type='submit' value='submit' onClick={this.handleSubmit}/>
      </div>
    );
  }
}
