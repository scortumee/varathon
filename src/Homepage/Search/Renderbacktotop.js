import Button from '@material-ui/core/Button';
import React,{ PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import scrollup from '../assets/scrollup.svg';
const styles = theme => ({
  buttonTop:{
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
})
class Renderbacktotop extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      intervalId: 0
    };
  }
  scrollStep =()=> {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop=()=> {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  render(){
    const { classes } = this.props;
    return <Button variant="contained" className={classes.buttonTop} onClick={ () => { this.scrollToTop(); }}>
              <img src={scrollup} alt="scrollup" width="30px" height="30px"/>
          </Button>
    }
  }

Renderbacktotop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Renderbacktotop);
