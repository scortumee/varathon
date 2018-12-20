import React, { PureComponent } from 'react';
import './Homepage.css';
import Search from './Search/Search';
import logo from './assets/varathonLogo.png';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
//import Grid from '@material-ui/core/Grid';
import deckNames from '../assets/deckNames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles=theme=>({
  button: {
   margin: theme.spacing.unit,
   padding:'2%'
 },
 buttonAbout:{
   margin: theme.spacing.unit,
   float:'left'
 }
})
class Mainheaderbar extends PureComponent{
  state={
    header:[
      {title:'Booster Pack', list:deckNames.boosterPack ,path:'/booster-packs'},
      {title:0, list:0 ,path:0},
      {title:'Starter Deck', list:deckNames.starterDeck ,path:'/starter-decks'},
      {title:'Structure Deck', list:deckNames.structureDeck ,path:'/structure-decks'},
      {title:0, list:0 ,path:0}
    ]
  };

  aboutUs=()=>{
    const { classes } = this.props;
    return (<div className="aboutus">
              <Button className={classes.buttonAbout}>about us</Button>
           </div>);
  }

  varathonLogo =()=>{
    const image=<img width='100%' src={logo} alt="logo" />
    return (
      <div className="logo-search">
        <Link to={{
          pathname:"/"
        }}>
        <div className="logo-position">{image}</div>
        </Link>
        <div className="search-position">
        <Search enterKey={this.props.enterkey} cache={this.props.cache} />
        </div>
      </div>
    );
  }


  headersBanner=()=> {
    const { classes } = this.props
    const data_header=["Booster Packs","Special Edition","Starter Decks","Structure Decks","Collector Tins"]
    const contents= data_header.map((item,i)=>{
      if(i===1) {
        return null;
      }
      else {return (
        <Link to={{
           pathname: this.state.header[i].path,
           title: this.state.header[i].title,
           list: this.state.header[i].list,
           deckIndex:0
           }} style={{ textDecoration: 'none' }}>
           <Button className={classes.button} variant='flat'>{item}</Button>
        </Link>
      )}
    })
    //console.log(contents)
    return (<div className="main-header-block">{contents}</div>);
  }

  render(){
    return(
      <div className="homepage">
        {/*this.aboutUs()*/}
        {this.varathonLogo()}
        {this.headersBanner()}
      </div>
    );
  }
}

Mainheaderbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mainheaderbar);
