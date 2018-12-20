import React, { PureComponent } from 'react';
import load from'../assets/loading.gif';
import noImage from '../assets/no-image.png';
import axios from 'axios';
const downLarge =(url) => {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => new Buffer(response.data, 'binary').toString('base64'))
}

class Largeimg extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      largeImage: null
    }
  }

  render(){

        //console.log(this.props.url);
        if (this.props.url==='NULL'){
          return <img src={noImage} alt="noImage"/>
        }
        let largeImg= downLarge(this.props.url);
        largeImg.then(response => {
          this.setState({largeImage:response});
        });

    return(
        this.state.largeImage===null?<img src={load} alt="loading..." />:
        this.props.modal && this.props.mobile?<img src={"data:image/jpeg;base64,"+this.state.largeImage} alt={this.props.k} width="100%"/>:<img src={"data:image/jpeg;base64,"+this.state.largeImage} alt={this.props.k} width={this.props.w} height={this.props.h}/>
    );
  }
}
export default Largeimg;
