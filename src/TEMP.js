//style={styles.button}
//onMouseEnter={() => this.startAnime()}
//onMouseLeave={() => this.stopAnime()}

/*<Draggable
  axis={'y'}
  onDrag={this.handleDrag}
>
<button
  style={styles.button}
  onMouseEnter={() => this.startAnime()}
  onMouseLeave={() => this.stopAnime()}
  >Drag me, BITCH</button>
</Draggable>*/

//renderPics: (data) => dispatch({type: 'UPDATE', value: data }),

<button
  style={styles.button}
  onMouseEnter={() => this.props.startAnime()}
  onMouseLeave={() => this.props.stopAnime()}>
  <img style={styles.image} src ={require('../Pic/Arrow_Button.png')}/></button>
  //<img style={styles.image} src ={require('../Pic/Arrow_Button.png')}/>

  onMouseEnter={() => this.props.startAnime()}
  onMouseLeave={() => this.props.stopAnime()}


  onStart={() => this.props.startAnime(0)}
    onStop={this.clearAndStop}

    import React, { Component } from 'react';
    import classes from './Card.module.css';

    const card = (props) => {
      const styleImage = {
        height: '100%',
        width: '100%'
      }

      return (
        <div className={classes.Card}>
          <img style = {styleImage} src ={"data:image/jpeg;base64," + props.image}/>
        </div>
      )
    };

    export default card;

    //<img src ={require('../assets/Arrow_Button.png')}/>


    <Draggable
      onDrag={this.handleDrag}
      onStop={this.clearAndStop}
      position={{x: 0, y:0}}
    >

          </Draggable>
          /*export const fetchNext = (deckValue) => {
            return (dispatch,getState) => {
              let {deckIndex} = getState().card;
              if(deckValue === -1) {
                if(deckIndex === -1 || deckIndex === 0) {
                  deckIndex = deckNames.starterDeck.length;
                }
              }
              else if(deckValue === 1) {
                if(deckIndex === deckNames.starterDeck.length-1) {
                  deckIndex = -1;
                }
              }
              console.log(deckIndex);

              let baseImages = [];
              let deckName = deckNames.starterDeck[deckIndex+deckValue].name;

              axios.get(`/Starter Deck/${deckName}.json`)
                .then(response => {
                  dispatch(storePopup(response.data.deck.wallpaper));
                  response.data.cards.map((image, index) => {
                    let base64 = new Promise((resolve, reject) => {
                       encode(image.image, { string: true }, (error, result) => {
                         if (error) reject(error);
                         if (result) resolve(result);
                       });
                     });

                     base64.then(value =>
                      baseImages[index] = value);

                  })
                  console.log(response.data);

                  //dispatch(showPopUp());
                  dispatch(loadNext(baseImages, response.data.cards.length,deckIndex+deckValue));
                  dispatch(fetchForReserve());
                  dispatch(clearAndContinue(-1, getState().card.index));
                })

                .catch(function (error) {
                  console.log(error);
                });
            };
          };
          */

          {this.props.showPopup ?
            <RingLoader
              color={'#123abc'}
              loading={true}
            />
            : null
          }

                <FlexView className={classes.redCircle}/>


                  <button className={classes.Button}>
                    <div className={this.state.triangleStyle}/>
                  </button>



                  <div>
                    {this.props.deckName}
                  </div>
                  bounds={{top:-200, bottom: 200, left:-300, right: 300}}
                  <CircularProgressbar  initialAnimation={false}   styles={{
                    path: {
                      transform: 'rotate(0deg)',
                      transformOrigin: 'center center',
                    },
                  }} percentage={100*(this.props.index1/this.props.mainIndex)} />

                  right:pointX+this.point.getBoundingClientRect().width-this.state.buttonLoc.x

                  top:pointY - this.state.buttonLoc.y-15, bottom: pointY-this.state.buttonLoc.y

/*   IN MENU.js                        */

<Draggable
  bounds={{top: 0, bottom: 0}}
  position={{x: this.state.posX, y:0}}
>

/* IN <DIV scrollMenu> */

{this.state.showTier0 ?
  <button
    className={this.state.mainStyle}
    onClick ={this.clicked1}
    onMouseEnter={this.clicked1}
    ref={(el) => this.instance = el}
  >
    Yu-Gi-Oh
  </button>
  : null
}

{this.state.showTier1 ?
  <Fragment>
    <button
      onClick={() => this.loadCategory("Booster Pack", deckNames.boosterPack)}
      ref={(el) => this.booster = el}
      className={classes.tier1}>BOOSTER PACK
    </button>
    <button
      onClick={() => this.loadCategory("Starter Deck", deckNames.starterDeck)}
      ref={(el) => this.starter = el}
      className={classes.tier1}>STARTER DECK
    </button>
    <button
      onClick={() => this.loadCategory("Structure Deck", deckNames.structureDeck)}
      ref={(el) => this.structure = el}
      className={classes.tier1}>STRUCTURE DECK
    </button>
  </Fragment>
  : null
}

{this.state.showTier2 ?
  <Fragment>
    {subMenus}
  </Fragment>
  : null
}


{/*<nav>
  <ul>
    <li><Link to={{
        pathname: '/'
      }}>Home</Link>
    </li>
  </ul>
</nav>*/}

/*           Inside shitty nuka carousel  */
<div className="top-left">
  <p className="carousel-text">Latest Booster Packs</p>
  <button className="button-style">Singles </button>
</div>

/*           Inside shitty nuka carousel  */
<Carousel
  autoplay={true}
  wrapAround={true}
  renderCenterLeftControls={({ previousSlide }) => (
    <div onClick={previousSlide} style={{color:'white'}}>
      <img src ={require('../assets/leftArrow.png')}/>
    </div>
  )}
  renderCenterRightControls={({ nextSlide }) => (
    <div onClick={nextSlide} style={{color:'white'}}>
      <img src ={require('../assets/rightArrow.png')}/>
    </div>
    )}
>
<Link to={{
 pathname: '/booster-packs',
 title: 'Booster Pack',
 list: deckNames.boosterPack,
 deckIndex:0
 }} style={{ textDecoration: 'none' }}><div className="container">
      <img src={booster} alt="booster" className="stretch"/>
  </div> </Link>

  <Link to={{
   pathname: '/structure-decks',
   title: 'Structure Deck',
   list: deckNames.structureDeck,
   deckIndex:0
   }} style={{ textDecoration: 'none' }}><div className="container">
      <img src={structure} alt="structure" className="stretch"/>
  </div> </Link>

  <Link to={{
   pathname: '/starter-decks',
   title: 'Starter Deck',
   list: deckNames.starterDeck,
   deckIndex:0
   }} style={{ textDecoration: 'none' }}><div className="container">
      <img src={starter} alt="starter" className="stretch"/>
  </div> </Link>
</Carousel>

{/*<img src ={require('../assets/tenor.gif')} style={{float: 'left'}} height='50'/>*/}

<img className ={classes.Pussy} src={pussy}/>
