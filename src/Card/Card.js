import React, { PureComponent } from 'react';
import Modalold from './Product_page/Modal.js'
import classes1 from './Card.module.css';
import Largeimg from './Product_page/Largeimg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ProductPage from './Product_page/ModalFinal';
import Grid from '@material-ui/core/Grid';
import Close from './close.svg';
function getModalStyle(left,top) {
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const wrapModal={
  overflow:'scroll',
}
const styles = theme => ({
  /*paper:{
    overflow:'scroll',
    webkitOverflowScrolling:'touch'
  },*/
  button: {
    marginTop:'30%',
    float:'right',
    backgroundColor: 'Transparent'
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
  }
});



class Card extends PureComponent {
  constructor( props ) {
    super( props );
    let mobile=false;
    const x = window.matchMedia("(max-width: 768px)");
    if(x.matches) {
      //this.props.switchMobile(true);
      mobile=true;
    }
    x.addListener(this.switchToMobile);
    this.state = {
      imageStyle: classes1.Image,
      mobile: mobile,
    };
  }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  switchToMobile =(x)=> {
    if(x.matches) {
      this.setState({mobile:true});
    }
    else {
      this.setState({mobile:false});
    }
    //this.props.renderOnSwitch();
  }

  switchVersion=()=>{
    const { classes } = this.props;
    return (
      <div>
        <div className={classes1.Card} onClick={this.handleOpen}>
            {this.props.image.detail.end !== undefined ?
                        <img className ={classes1.EndTag} src={require('../assets/EndTag.png')} alt='endTag'/>
                        :null
                      }
            <img ref={(el) => this.image = el} className = {classes1.Image} src ={"data:image/jpeg;base64," + this.props.image.img} alt={this.props.image.detail!==undefined?this.props.image.detail.name:"blank"}/>
        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          className={!this.state.mobile?null:classes1.Paper}
        >
        {this.state.mobile?
          <div>

              <Button onClick={this.handleClose}className={classes.button}><img src={Close} alt="close"/></Button>

            <div style={getModalStyle(50,50)} className={classes.paperMobile} >

              {this.props.image.detail['large image']==='NULL'?<Largeimg url={this.props.image.detail['image']}/>:<Largeimg url={this.props.image.detail['large image']}/>}

              <div className={classes.paper2} >
                  <ProductPage detail={this.props.image.detail} mobile={this.state.mobile}/>
              </div>
            </div>
          </div>:

          <div style={getModalStyle(50,50)} className={classes.paperDesktop}>

          <Grid container spacing={24}>
          <Grid item xs={12}>
          <Button onClick={this.handleClose} className={classes.buttonDesktop}><img src={Close} alt="close"/></Button>
          </Grid>
            <Grid item xs={5}>

              {this.props.image.detail['large image']==='NULL'?<Largeimg url={this.props.image.detail['image']}/>:<Largeimg url={this.props.image.detail['large image']}/>}
            </Grid>
            <Grid item xs={7}>

              <ProductPage detail={this.props.image.detail} mobile={this.state.mobile}/>
            </Grid>
          </Grid>
            </div>

        }
        </Modal>

        </div>
    );
  }
  render () {
    return (
      <div>
        {this.switchVersion()}
      </div>
    );
  }
}
Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);


/*
<Modalold input={
            <div className={classes1.Card}>
              {this.props.image.detail.end !== undefined ?
                <img className ={classes1.EndTag} src={require('../assets/EndTag.png')} alt='endTag'/>
                :null
              }
              <img ref={(el) => this.image = el} className = {classes1.Image} src ={"data:image/jpeg;base64," + this.props.image.img} alt={this.props.image.detail!==undefined?this.props.image.detail.name:"blank"}/>
            </div>
          }  //go to Modal.js for modification
     detail={this.props.image.detail}
     cardimage={"data:image/jpeg;base64," + this.props.image.img}>
</Modalold>
*/
