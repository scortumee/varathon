import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ProductPage from '../../Card/Product_page/ModalFinal';
import Largeimg from '../../Card/Product_page/Largeimg';
import Close from '../../Card/close.svg';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createBrowserHistory } from "history";
import './style.css';
import classes1 from './scroll.module.css';
const history = createBrowserHistory();


function getModalStyle(left,top) {
  //const top = 50;
  //const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  root: {
    flexGrow: 0,
    minWidth: 300,
    maxWidth:500,
    width: '40vw',
    padding: theme.spacing.unit * 2,
    marginTop:'2%',
    marginBottom:'2%',
    textAlign:'left'
  },
  rootMobile: {
    flexGrow: 0,
    minWidth: 300,
    maxWidth:375,
    //width: '40vw',
    padding: theme.spacing.unit * 2,
    marginTop:'3%',
    //marginBottom:'2%',
    //marginLeft:'6%',
    //fontSize:'2px',
    textAlign:'left'
  },
  image: {
    cursor: 'pointer',

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 60,
    minHeight:700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  paper1: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    textAlign:'center',
  },
  button:{
    margin: theme.spacing.unit,
  },
  button1:{
    marginTop:'30%',
    float:'right',
    backgroundColor: 'Transparent'
  },
  des:{
    //marginTop:'5%'

  },
  space:{
    marginTop:'10%',
    marginBottom:'10%'
  },
  buttonDesktop:{
    float:'right',
    backgroundColor: 'Transparent'
  },
  paperMobile: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    //backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    //minHeight:470,
    textAlign:'center',

  },
  paperDesktop: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    minHeight:700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign:'center',
    padding: theme.spacing.unit * 2,
    paddingLeft:theme.spacing.unit*5
  },

  paper2:{
    position: 'absolute',
    width: theme.spacing.unit * 40,

    backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    textAlign:'center',
    marginTop:'10%',
  },

  paper3:{
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    textAlign:'center',
    color:'white'
  },
  close:{
    position: 'absolute',
    width: theme.spacing.unit * 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  wrap:{
    overflow:'scroll'
  }
});
class ComplexGrid extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      open:false,
      results:null,
      loading:false,
      results1:null,
    }
    if(this.state.results===null){
      this.checkPrice(this.props.setnumber);
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkPrice =(setno)=>{
    axios.get(`https://us-central1-varathon-a9121.cloudfunctions.net/checkPrice?keyword=${setno}`)
    .then(({data})=>{
      //console.log(data['data']['price_data']['price_data']['data']['prices'])
      this.setState({
        results1:data['data']['price_data']['price_data']['data']['prices']
      })
    }).catch((err)=>{
      //console.log(err)
    })
  }
  getVariant=()=>{
    //console.log('clciked')
    axios.get('https://us-central1-varathon-a9121.cloudfunctions.net/search?variant='+this.props.name)
         .then(({ data }) => {
           this.setState({
            //loadingCache:false,
             results: data,
             loading:false,
           },()=>{
             history.push({
               pathname:"/search/"+this.props.name,
               state:{
                 detail:this.state.results,
                 query:this.props.name
               }
             })
           })
         })
    this.setState({
      loading:true,
      //enterPressed:false,
      //resultWait:this.state.resultWait+1
    })
  }

  render(){
    const { classes } = this.props;
  //  console.log(this.state.results)

    return (

      <Paper className={!this.props.mobile?classes.root:classes.rootMobile}>
        <Grid container spacing={24}>
          <Grid item xs={5}>
             <ButtonBase className={classes.image} onClick={this.handleOpen}>
              {this.props.image}
             </ButtonBase>
             {
               this.props.carddetail===undefined?<Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                <div style={getModalStyle(50,50)} className={!this.props.mobile?classes.paper:classes.paper1}>
                    {this.props.largeimage}
                  </div>
                </Modal>:
                <Modal
                   aria-labelledby="simple-modal-title"
                   aria-describedby="simple-modal-description"
                   open={this.state.open}
                   onClose={this.handleClose}
                   className={!this.props.mobile?null:classes1.Paper}
                 >
                 {this.props.mobile?
                   <div>

                       <Button onClick={this.handleClose}className={classes.button1}><img src={Close} alt="close"/></Button>

                     <div style={getModalStyle(50,50)} className={classes.paperMobile} >

                       {this.props.carddetail['large image']==='NULL'?<Largeimg url={this.props.carddetail['image']}/>:<Largeimg url={this.props.carddetail['large image']}/>}

                       <div className={classes.paper2} >
                           <ProductPage detail={this.props.carddetail} mobile={!this.state.mobile}/>
                       </div>
                     </div>
                   </div>:

                   <div style={getModalStyle(50,50)} className={classes.paperDesktop}>

                   <Grid container spacing={24}>
                     <Grid item xs={12}>
                      <Button onClick={this.handleClose} className={classes.buttonDesktop}><img src={Close} alt="close"/></Button>
                     </Grid>
                     <Grid item xs={5}>

                       {this.props.carddetail['large image']==='NULL'?<Largeimg url={this.props.carddetail['image']}/>:<Largeimg url={this.props.carddetail['large image']}/>}
                     </Grid>
                     <Grid item xs={7}>

                       <ProductPage detail={this.props.carddetail} mobile={this.props.mobile}/>
                     </Grid>
                   </Grid>
                     </div>

                 }
                  </Modal>
             }

          </Grid>
              <Grid item xs={6} className={classes.des} >
              <div className="font">
                  {
                    !this.props.mobile?<p className="heading">{this.props.name.replace(/_/g, ' ')}</p>:
                    <p className="heading-mobile">{this.props.name.replace(/_/g, ' ')}</p>
                  }

                  {

                    !this.props.mobile?<div><p className="sub-heading">-{this.props.packName}</p>
                    <p className="sub-heading">-{this.props.setnumber}</p>
                    <p className="sub-heading">-{this.props.rarity}</p>
                    </div>:<div><li className="sub-heading-mobile">{this.props.packName}</li>
                    <li className="sub-heading-mobile">{this.props.setnumber}</li>
                    <li className="sub-heading-mobile">{this.props.rarity}</li>
                    </div>
                  }

                  {
                    this.state.results1!==null?!this.props.mobile?<div className="price-wrap"><p className="heading-price"> Average Price</p>
                                               <p className='price'>$ {this.state.results1['average']}</p></div>:<div className="price-wrap-mobile"><p className="heading-price"> Avg Price:</p>
                                                                          <p className='price'>$ {this.state.results1['average']}</p></div>:null
                  }

                    {this.props.description!==undefined || this.props.mobile?null:<div className="see-all-desktop"><Button size="small" onClick={()=>{
                      this.getVariant()
                    }}>see all versions</Button></div>
                  }
                  {
                    this.state.loading?<CircularProgress className={classes.progress} size={20} />:null
                  }
              </div>
              </Grid>
              {this.props.description!==undefined?<Grid item xs>
                                                      <Typography variant="body1" align='left'>
                                                        {this.props.description}
                                                      </Typography>
                                                    </Grid>:null
                                                  }



        </Grid>
        {
          this.state.results!==null?history.go()/*<Redirect to={{
            pathname:"/search/variant/"+this.props.name,
            detail:this.state.results,
            query:this.props.name,
          }}/>*/:null
        }
      </Paper>

    );
  }
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
//  <Grid item xs={12} sm container>
  //  <Grid item xs container direction="column" spacing={16}>
//  </Grid>
//</Grid>

/*
<Typography variant="tittle" className={classes.space}>{this.props.name.replace(/_/g, ' ')}</Typography>
<Typography variant="tittle" color="textSecondary" className={classes.space}>{this.props.packName}</Typography>
<Typography variant="tittle" className={classes.space}>{this.props.rarity}</Typography>
<Typography variant="tittle"className={classes.space}>{this.props.setnumber}</Typography>*/
