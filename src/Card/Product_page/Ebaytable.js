import React, { PureComponent } from 'react';
import Ebay from './Ebay';
import './Modal.css';
import Purchase from './Purchase';

class Ebaytable extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      ebayList: null
    }
  }
  render(){
    if(this.state.ebayList === null){
      let ebaylistings= Ebay(this.props.keyword);
      ebaylistings.then(response => {
        console.log(response);
        this.setState({ebayList: response});
      });
    }
    if(this.state.ebayList != null){
      console.log(this.state.ebayList[0]['minValuePrice']);
    }
    return (
      this.state.ebayList===null? (<div>loading</div>) :
      (<Purchase lowprice={this.state.ebayList[0]['minValuePrice']} listings={this.state.ebayList[0]['listings']} />)
    );
  }
}
export default Ebaytable;
