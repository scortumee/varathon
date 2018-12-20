import React, { PureComponent } from 'react';
import Popup from "reactjs-popup";
import './Modal.css';
import Ebaytable from './Ebaytable';
import Largeimg from './Largeimg';
import Tracker from './Tracker';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import './Modal.css';
//import 'typeface-roboto';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    borderRadius:'8px'
    //color: theme.palette.text.secondary,
  },
  space:{
    marginTop:'auto',
    marginBottom:'auto',
  },
  moveup:{
    marginTop:'-6%',
  },
  powmob:{
    marginTop:'15%'
  }

});

class Modal extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      results:null,
    }

  }
  checkPrice =(setno)=>{
    axios.get(`https://us-central1-varathon-a9121.cloudfunctions.net/checkPrice?keyword=${setno}`)
    .then(({data})=>{
      console.log(data['data']['price_data']['price_data']['data']['prices'])
      this.setState({
        results:data['data']['price_data']['price_data']['data']['prices']
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  render (){
    const { classes } = this.props;

    const details=this.props.detail;
    if (details!=null && details['card details']!=null){

      const isarrayRare=Array.isArray(details['rarity']);
      const isarrayType=Array.isArray(details['card type']);

      const containsArch=("archetypes" in details['card details']);
      const containsatkdef=("ATK_DEF" in details['card details']);
      let res=[]
      if (containsatkdef){
        res=details['card details']['ATK_DEF'].split("/")
      }
      //console.log(this.state.largeImage);
      if(this.state.results===null){
        this.checkPrice(details['set number']);
      }
      /*
      <Tracker id={details['set number']} name={details['name']}/>
      */
      return (

                   <div className="rob-font">

                   <Grid container spacing={24} className={classes.paper}>

                     {
                       this.props.mobile?
                       <div>
                       <Grid item xs={12}>
                        <p className="mobile-heading">
                          {details['name'].replace(/_/g, ' ')}
                        </p>
                        </Grid>
                       <Grid item xs={12} >
                       <span className="mobile-list">
                        <li>
                        {details['obj key'].replace(/_/g, ' ')}
                        </li>
                        <li>
                        {details['set number']}
                        </li>
                        {details['rarity']===undefined?null:<li>{details['rarity']}</li>}
                        </span>
                       </Grid>
                       </div>:null

                     }
                     {
                       this.props.mobile?null:<Grid item xs={12}>
                        <p className="desktop-heading">
                          {details['name'].replace(/_/g, ' ')}
                        </p>
                        </Grid>
                     }

                     {
                       this.props.mobile?null:<Grid item xs={3} className={classes.moveup}>
                        <p>Origin:</p>
                        <p>Number:</p>
                        {details['rarity']===undefined?null:<p>Rarity:</p>}
                       </Grid>
                     }
                     {
                       this.props.mobile?null:

                       <Grid item xs={9} className={classes.moveup}>
                        <p>
                        {details['obj key'].replace(/_/g, ' ')}
                        </p>
                        <p>
                        {details['set number']}
                        </p>

                        {details['rarity']===undefined?null:<p>{details['rarity']}</p>}

                        <p className="desktop-description">Description:</p>
                        <p className="desktop-description">{details['card details']['Description']}</p>
                       </Grid>

                     }

                     {
                       this.props.mobile?<Grid item xs={12}>
                       <p className="description-mob">Description:</p>
                       <p>{details['card details']['Description']}</p>
                       </Grid>:null
                     }


                     {
                       this.state.results===null?null:
                       this.props.mobile?
                       <div className="prices-main-mob">
                       <div className="prices-main-sub1-mob">
                        <p className="avg-mob">
                        Average Price:
                        </p>
                        <p className="avg-mob-price">
                        $ {this.state.results['average']}
                        </p>
                       </div>
                       <div className="range-mob">
                        <p className="avg-mob">
                        Price Range:
                        </p>
                        <p className="avg-mob">
                        $ {this.state.results['low']} - $ {this.state.results['high']}
                        </p>
                       </div>

                       </div>:

                       <div className="prices-main">
                       <div className="prices-main-sub1">
                        <p>
                        Average Price:
                        </p>
                        <p className="price-font">
                        $ {this.state.results['average']}
                        </p>
                       </div>
                       <div className="desk-sub">
                        <p>
                        Price Range:
                        </p>
                        <p className="price-font">
                        $ {this.state.results['low']} - $ {this.state.results['high']}
                        </p>
                       </div>

                       </div>
                     }
                     {
                       this.props.mobile?<Grid item xs={12} className={classes.powmob}>
                       <p> powered by Yugiohprices.com</p>
                       </Grid>:<Grid item xs={12}>
                       <p> powered by Yugiohprices.com</p>
                       </Grid>
                     }

                   </Grid>


                   </div>

      );

    }
  return null;

  }
}
Modal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Modal);

/*
<div className="header"> {details['name']} </div>
<table className="tabledetails">
<tbody>
<tr>
<td className="properties">Set Name</td>
<td className="value" key="set number">{details['set number']}</td>
</tr>
<tr>
<td className="properties">Rarity</td>
<td className="value" key="rarity">{
  isarrayRare?(<ul>
   {details['rarity'].map((item,index) =>
       <li key={index}>{item}</li>
   )}
   </ul>): details['rarity']
}</td>
</tr>
<tr>
<td className="properties">Type</td>
<td className="value" key="card type">{
  isarrayType?(<ul>
   {details['card type'].map((item,index) =>
       <li key={index}>{item}</li>
   )}
   </ul>): details['card type']
}</td>
</tr>



<Ebaytable keyword={details['set number']}/>
*/

/*

{
  !this.props.mobile && containsArch ?res.length===2?
    <Grid item xs={6}  className={classes.space}>
     <Typography>
     Atk:
     </Typography>
     <Typography>
     Def:
     </Typography>
    </Grid>
  :null:null
}
{
  !this.props.mobile && containsArch ?res.length===2?
    <Grid item xs={6}  className={classes.space}>
     <Typography>
     {res[0]}
     </Typography>
     <Typography>
     {res[1]}
     </Typography>
    </Grid>
  :null:null
}

{containsArch?<Grid item xs={6} className={classes.space}>
 <Typography >Archetype:</Typography>
</Grid>:null
}
{
  containsArch?(


    <Grid item xs={6}>
      <List dense={true}>{details['card details']['archetypes'].map((item,index) =>
          <Typography>{item}</Typography>
      )}</List>
    </Grid>


  ):null
}
*/

/*
<Grid item xs={6}>
 {
   isarrayRare?(<List dense={true}>
    {details['rarity'].map((item,index) =>
        <Typography>{item}</Typography>
    )}
    </List>): <Typography>{details['rarity']}</Typography>
 }

</Grid>
*/
