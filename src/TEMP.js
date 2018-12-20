/********** inside Deck.js image tag******/
alt={this.props.deck.detail!==undefined?this.props.deck.detail.name:"blank"}
/*********** inside Deck.js image tag *****/

/******** inside newBooster func ********/
const carosol=
<Grid container className={classes.wrap}>
{Object.keys(imagesBooster).map((key)=>
    <Grid item className={classes.imageBox}>
    <Grid container spacing={24} alignItems="center">
    {console.log(key)}
      <Grid item xs={12}>
        <ButtonBase className={classes.image}>
          <img src={imagesBooster[key]} alt={key} width="150px" height="275px"/>
        </ButtonBase>
      </Grid>
      <Grid item xs={12}>
        <h5>{key.replace(/_/g," ")}</h5>
      </Grid>
    </Grid>
    </Grid>
  )}</Grid>;
/************** inside newBooster func ********/

<div>
<ButtonBase className={classes.image}>
  <img src={imagesBooster[key]} alt={key} width="100%" />

</ButtonBase>
  <h2>{key.replace(/_/g," ")}</h2>
  </div>

/******** ********/
<Link to={{
  pathname: `${this.props.path}/${this.props.deck.detail.name}`,
  title: this.props.title,
  list: this.props.list,
  deckName: this.props.deck.detail.name,
  deckIndex:Math.abs(this.props.deck.detail.id-this.props.list.length+1)
}} className={classes.text}>  <div>Singles </div>
</Link>
/******** ********/
<Link to={{
 pathname: '/booster-packs',
 title: 'Booster Pack',
 list: deckNames.boosterPack,
 deckIndex:0
}} style={{ textDecoration: 'none' }}>
