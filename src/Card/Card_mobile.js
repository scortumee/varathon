import React, { PureComponent } from 'react';
import ProductPage from './Product_page/Modal.js'
import classes1 from './Card.module.css';
import Largeimg from './Product_page/Largeimg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
  paper:{
    overflow:'scroll'
  },
  paper1: {
    position: 'absolute',
    width: theme.spacing.unit * 40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign:'center',
  },
  paper2:{
    position: 'absolute',
    width: theme.spacing.unit * 40,

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign:'center',
  }
});

class Card extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      imageStyle: classes1.Image,
      open:false
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render () {
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
          className={classes.paper}
        >

            <div style={getModalStyle(50,50)} className={classes.paper1} >
            {this.props.image.detail['large image']==='NULL'?<Largeimg url={this.props.image.detail['image']}/>:<Largeimg url={this.props.image.detail['large image']}/>}


            <div style={getModalStyle(250,250)} className={classes.paper2} >
                <ProductPage detail={this.props.image.detail}/>
            </div>
            </div>

          </Modal>

        </div>
    );
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Card);
