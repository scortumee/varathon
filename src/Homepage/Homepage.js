import React, { PureComponent } from 'react';
import './Homepage.css';
import mainB from './assets/Banner.png';
import Mainheaderbar from'./Mainheaderbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Link} from 'react-router-dom';
import deckNames from '../assets/deckNames';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => images[item.replace('./', '').replace('__',':_').replace('  ',': ').split(".")[1]] = r(item));
  return images;
}

const styles = theme => ({
  button: {
   margin: theme.spacing.unit,
   //minWidth:100
   },
  buttonPage: {
    margin: theme.spacing.unit,
  },
  bannerTag: {
    margin: '15% 0'
  },
  boosterWrap:{
    width: '100%',
    backgroundColor:'white',
    //width:'100%',
    margin:'0 2.2%',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: '1px',
    borderColor: '#d6d6d6',
    borderStyle: 'solid',
    [theme.breakpoints.down('xs')]: {
      width:'auto',
      margin:'0 10% 3% 10%'
    }
  },
  image: {
    cursor: 'pointer',
    width: '13vw',
    backgroundColor:'transparent',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
      margin: '0 25%'
    }
  },
  imageWrap: {
    //width:'100%',
    marginTop: '8%',
    height:'26vw',
    backgroundColor:'transparent',
    display:'flex',
    justifyContent:'center',
    borderStyle: 'none',
    borderWidth: '1px',
    borderColor: 'grey',
    [theme.breakpoints.down('xs')]: {
      marginTop:'10%',
      height: '100%'
    }
  },
  text: {
    //width:'100%',
    backgroundColor:'transparent',
    color:'black',
    marginBottom:'5%',
    fontFamily: 'Roboto',
    [theme.breakpoints.down('xs')]: {
      margin: '5% 5%'
    }
  },
  tierWrap1: {
    backgroundColor: 'white',
    paddingTop: '5%',
    [theme.breakpoints.down('xs')]: {
      backgroundColor:'#F0F0F0',
      paddingTop: '10%',
    }
  },
  wrap:{
    margin:'0 10% 2.5% 10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems:'center',
    fontSize:'1em',
    backgroundColor: 'transparent',
    paddingTop: '1%'
  },
  wrapMobile: {
    /*marginLeft:'20%',
    marginRight:'20%',*/
    display: 'flex',
    flexDirection: 'column',
    fontSize:'1em',
    backgroundColor: 'transparent'
  }
});


class Homepage extends PureComponent{
  constructor( props ){
    super( props );
    let wrap,mobile;
    const x = window.matchMedia("(max-width: 600px)");
    if(x.matches) {
      wrap = this.props.classes.wrapMobile;
      mobile=true;
    }
    else {
      wrap = this.props.classes.wrap;
      mobile=false;
    }
    x.addListener(this.switchToMobile);

    this.state={
      wrap: wrap,
      mobile:mobile,
      header:[
        {title:'Booster Pack', list:deckNames.boosterPack ,path:'/booster-packs'},
        {title:'Starter Deck', list:deckNames.starterDeck ,path:'/starter-decks'},
        {title:'Structure Deck', list:deckNames.structureDeck ,path:'/structure-decks'}
      ]
    };
  }

  switchToMobile = (x)=> {
    if(x.matches) {
      this.setState({wrap:this.props.classes.wrapMobile,mobile:true});
    }
    else {
      this.setState({wrap:this.props.classes.wrap,mobile:false});
    }
  }
  mainBanner=()=>{
   const { classes } = this.props;
   const statement=<h1>Yugioh databases dont have to be ugly</h1>
   const subStatement=<h3>Choose a category and see why</h3>
   const array=["booster","starter","structure"]

   const contents= array.map((item,i)=>{
     return (
       <Link to={{
          pathname: this.state.header[i].path,
          title: this.state.header[i].title,
          list: this.state.header[i].list,
          deckIndex:0
          }} style={{ textDecoration: 'none' }}>
        <Button variant="outlined" className={classes.button}>{item}</Button>
      </Link>
     )
   })
   return (
     <div style={{position:'relative',alignItems:'center'}}>
       {!this.state.mobile ?
         <div className="on-image">
          <div style={{display:'flex',flexDirection:'column',marginRight:'5%',width:'55%'}}>
           {statement}
           <div className='bannerButtons'>
             {subStatement}
             {contents}
           </div>
          </div>
         </div>
         :null
      }
      {!this.state.mobile ?
        <div className="banner-container">
         <img src={mainB} className="banner-style" alt="banner"/>
        </div>
       :
       <div className="banner-container">
         <img src={require('./assets/bannerMobile.png')} className="banner-style" alt="banner"/>
         <div className={classes.bannerTag}>
           {statement}
           <div>
             {subStatement}
             {contents}
           </div>
         </div>
       </div>
      }
     </div>
   );
 }

  newBooster=()=>{
    const { classes } = this.props;
    const booster1 = importAll(require.context('./assets/mostSearched1', false, /\.(png|jpe?g|svg)$/));
    const booster2 = importAll(require.context('./assets/mostSearched2', false, /\.(png|jpe?g|svg)$/));
    const row1=
    <div container className={this.state.wrap}>
    {Object.keys(booster1).map((key)=>
      <div className={classes.boosterWrap}>
        <div className={classes.imageWrap}>
          <ButtonBase className={classes.image}>
            <Link to={{pathname: `./booster-packs/${key}`}}>
              <img src={booster1[key]} alt={key} width="100%" />
            </Link>
          </ButtonBase>
        </div>
        <div className={classes.text}>{key.replace(/_/g," ")}</div>
      </div>

    )}</div>;

    const row2=
    <div container className={this.state.wrap}>
    {Object.keys(booster2).map((key)=>
      <div className={classes.boosterWrap}>
        <div className={classes.imageWrap}>
          <ButtonBase className={classes.image}>
            <Link to={{pathname: `./booster-packs/${key}`}}>
              <img src={booster2[key]} alt={key} width="100%" />
            </Link>
          </ButtonBase>
        </div>
        <div className={classes.text}>{key.replace(/_/g," ")}</div>
      </div>

    )}</div>;

    return (
          <div className={classes.tierWrap1}>
            <div className="heading-booster">Most Searched Packs</div>
            <div>
            {row1}
            {row2}
            </div>
          </div>
        );
  }
  render(){

    return(
      <div className="homepage">
        <Mainheaderbar />
        {this.mainBanner()}
        {this.newBooster()}
      </div>
    )
  }
}


Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
