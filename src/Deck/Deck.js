import React, { PureComponent } from 'react';
import classes from './Deck.module.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

class Deck extends PureComponent {
  constructor( props ) {
    super( props );
    this.state = {
      showButtons: false,
      showDeck:false
      //showImage
      //imageStyle: classes.Image
    };
  }

  showButtons =(val) => {
    if(!this.props.mobile) {
      if(val) {
        //this.setState({imageStyle: classes.ImageDark});
        this.image.style.filter='brightness(0.35)';
      }
      else {
        this.image.style.filter='brightness(1)';
        //this.setState({imageStyle: classes.Image});
      }
      this.setState({showButtons: val});
    }
    else {
      // do nothing
    }
  }

  showDeck = ()=> {
    this.setState({showDeck:true});
  }
  hideDeck = ()=> {
    this.setState({showDeck:false});
    this.showButtons();
  }

  renderMobile = () => {
    if(this.props.sealed) {
      return (
        <img onClick={()=>this.showDeck()} className = {classes.Image} src ={"data:image/jpeg;base64," + this.props.deck.img} alt={this.props.deck.detail.id}/>
      )
    }
    else{
      return (
        <Link to={{
          pathname: `${this.props.path}/${this.props.deck.detail.name}`,
          title: this.props.title,
          list: this.props.list,
          deckName: this.props.deck.detail.name,
          deckIndex:Math.abs(this.props.deck.detail.id-this.props.list.length+1)
        }} >  <img className = {classes.Image} src ={"data:image/jpeg;base64," + this.props.deck.img} alt={this.props.deck.detail.id}/>
        </Link>
      )
    }

  }
  render () {
    return (
      <div onMouseEnter={()=>this.showButtons(true)} onMouseLeave={()=>this.showButtons(false)}className={classes.Deck}>
        {this.state.showButtons ?
          <div className = {classes.hoverField}>
            <Link to={{
              pathname: `${this.props.path}/${this.props.deck.detail.name}`,
              title: this.props.title,
              list: this.props.list,
              deckName: this.props.deck.detail.name,
              deckIndex:Math.abs(this.props.deck.detail.id-this.props.list.length+1)
            }} className={classes.text}>  <div>Singles </div>
            </Link>
            <div onClick={()=>this.showDeck()}className={classes.button}> Sealed </div>
            <Modal open={this.state.showDeck} close={this.hideDeck} deck={this.props.deck.detail}/>
          </div>
          :null
        }
        {!this.props.mobile ?
          <img ref={(el) => this.image = el} className = {classes.Image} src ={"data:image/jpeg;base64," + this.props.deck.img} alt={this.props.deck.detail.id}/>
          :
          this.renderMobile()
        }
        <Modal open={this.state.showDeck} close={this.hideDeck} deck={this.props.deck.detail}/>
        <div> {this.props.deck.detail === 0 ? '' :this.props.deck.detail.name.split("_").join(" ")} </div>
        {this.props.deck.detail.end !== undefined ?
          <img className ={classes.EndTag} src={require('../assets/EndTag.png')} alt='endTag'/>
          :null
        }
      </div>
    );
  }
}
export default Deck;
