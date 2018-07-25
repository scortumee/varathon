import React, { Fragment, Component } from 'react';
import classes from './Menus.module.css';
import FlexView from 'react-flexview';

class Menus extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      showTier1: false,
      showTier2: false,
      tierStyle1: classes.btn2
    };
  }

  clicked1 = () => {
    if(this.state.showTier1) {
      this.setState({showTier1: false, showTier2: false});

      this.setState({tierStyle1: classes.btn2})
    }
    else {
      this.setState({showTier1: true, });
      this.setState({tierStyle1: classes.btn2Clicked})
    }
  }

  clicked2 = () => {
    if(this.state.showTier2) {
      this.setState({showTier2: false});
      //this.setState({tierStyle0: classes.btn2})
    }
    else {
      this.setState({showTier2: true});
      //this.setState({tierStyle0: classes.btn2Clicked})
    }
  }

  render() {

    return (
      <div>
        <button
          className={this.state.tierStyle1}
          onClick ={this.clicked1}
        >Yu-Gi-Oh</button>
        {this.state.showTier1 ?
          <Fragment>
            <button className={classes.btn3}>
              Booster Pack
            </button>
            <button className={classes.btn3}>
              Starter Deck
            </button>
            <button className={classes.btn3}>
              Structure Deck
            </button>
          </Fragment>
          : null
        }

        {this.state.showTier2 ?
          <Fragment>
            <button className={classes.btn}>
              Booster Pack
            </button>
            <button className={classes.btn}>
              Starter Deck
            </button>
            <button className={classes.btn}>
              Structure Deck
            </button>
          </Fragment>
          : null
        }
      </div>
    );
  }
}

export default Menus;


  /*  <button className={classes.btn3}>Yu-Gi-Oh</button>
    <button className={classes.btn}>Booster Pack</button>
    <button className={classes.btn}>Starter Deck</button>
    <button className={classes.btn}>Structure Deck</button>

*/
