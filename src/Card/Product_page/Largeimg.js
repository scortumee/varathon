import downLarge from './downLarge';
import React, { PureComponent } from 'react';
import load from'./loading.gif';
class Largeimg extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      largeImage: null
    }
  }

  render(){
      if (this.state.largeImage===null){
        console.log(this.props.url);
        let largeImg= downLarge(this.props.url);
        largeImg.then(response => {
          this.setState({largeImage:response});
        });
    }
    return(
        this.state.largeImage===null?<img src={load} alt="loading..." />:<img width='60%' src={"data:image/jpeg;base64,"+this.state.largeImage}/>
    );
  }
}
export default Largeimg;
