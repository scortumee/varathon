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

    <Menu>
    <SubMenu title={<span>sub menu</span>} key="1">
    <MenuItem key="1-1">0-1</MenuItem>
    <MenuItem key="1-2">0-2</MenuItem>
    </SubMenu>

    <MenuItem key="2">1</MenuItem>
    <MenuItem key="3">outer</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem key="5">outer3</MenuItem>
    </Menu>
    <DragScroll height={200} width={300}>
        <div>testffdfssdfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsfsdfdsf1</div>
        <div>test2</div>
        <div>test3</div>
        <div>test4</div>
        <div>test5</div>
        <div>test6</div>
        <div>test7</div>
        <div>test8</div>
        <div>test9</div>
        <div>test10</div>
        <div>test11</div>
        <div>test12</div>
        <div>test13</div>
        <div>test14</div>
        <div>test15</div>
        <div>test16</div>
        <div>test17</div>
        <div>test18</div>
        <div>test19</div>
        <div>test20</div>
    </DragScroll>

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
