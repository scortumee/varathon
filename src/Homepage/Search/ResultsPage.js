import React,{ PureComponent } from 'react';
import Largeimg from './Largeimg';
import Mainheaderbar from "../Mainheaderbar";
import Sample from "./DisplayResultGrid";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Renderbacktotop from'./Renderbacktotop';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import * as actionCreators from '../../store/actions/index';
//import {connect} from 'react-redux';
//import back from'./back.svg';
import {Link,Redirect} from "react-router-dom";
//import { createBrowserHistory } from "history";

//const history = createBrowserHistory();
//import Drawer from '@material-ui/core/Drawer';

//const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 150,
    padding: theme.spacing.unit * 1,
    marginTop:'1%'
  },
  rootDesktop: {
    flexGrow: 1,
    minWidth: 150,
    padding: theme.spacing.unit * 2,
    marginTop:'-6.75%',
    minHeight:'600px'
  },
  rootMobile: {
    flexGrow: 1,
    //display:'inline',
    width: '375px',
    //maxWidth:'150%',
    padding: theme.spacing.unit * 2,
    marginTop:'1%',
    maxHeight:'40px'
  },
  filterpos:{
    display:'inline-block'
  },
  rootPagenumber: {
    flexGrow: 1,
    //minWidth: 900,
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    minWidth:100
  },
  buttonPage: {
    margin: theme.spacing.unit,
  },
  input: {
     display: 'none',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mainGrid:{
    marginTop:'2%',
    marginBottom:'2%',
    backgroundColor:'#f8f9fa'
  },
  subGrid1:{
    marginLeft:'20%',
    marginRight:'-0.45%',
    marginTop:'1.2%',
    marginBottom:'2%',

  },
  subGridMobile:{
    //marginLeft:'1%',
    //marginRight:'1%',
    marginTop:'-1%',
    marginBottom:'1%',

  },
  subGrid2:{
    marginTop:'0.30%',
   marginLeft:'1%',
    marginRight:'5%',
  },
  menu: {
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  filterMobileStyle:{
    marginTop:'auto',
    marginBottom:'auto'
  },
  filterMobileStyleResult:{
    marginTop:'auto',
    marginBottom:'auto',
    marginRight:'20%'
  },
  buttonTop:{
    //margin: theme.spacing.unit,
    position: 'fixed',
    top: '0px',
    left: '2px',
  },
  mobileMain:{
    marginTop:'-6.25%'
  }
});

const select=[
  {
    value: 'Singles',
    label: 'Singles',
  },
  {
    value: 'Sets',
    label: 'Sets',
  },
  {
    value: 'None',
    label: 'None',
  },
]
class About extends PureComponent{

  constructor(props){
    super(props);
    let mobile=false;
    const x = window.matchMedia("(max-width: 768px)");
    if(x.matches) {
      //this.props.switchMobile(true);
      mobile=true;
    }
    x.addListener(this.switchToMobile);
    this.state={
      flagSingles:false,
      flagSets:false,
      singles:[],
      sets:[],
      currentPage: 1,
      todosPerPage: 50,
      name:'',
      mobile:mobile,
      selectedValue: 'None',
      back:false,
      store:null,
    };
    //this.goBack = this.goBack.bind(this);
  }


  switchToMobile =(x)=> {
    if(x.matches) {
      this.setState({mobile:true});
    }
    else {
      this.setState({mobile:false});
    }
    //this.props.renderOnSwitch();
  }


  handleClickpage =(event) =>{
        this.setState({
          currentPage: Number(event)
        });
      }
  readyThebox = (detail) =>{
    if(detail["name"]!==detail["obj key"]){
      return(
        <Sample image={!this.state.mobile?<Largeimg url={detail["image"]} w="190" h="276" k={detail["set number"]} modal={false} mobile={this.state.mobile}/>:<Largeimg url={detail["image"]} w="150" h="218" k={detail["set number"]} modal={false} mobile={this.state.mobile}/>}
                name={detail["name"]}
                pack={detail["pack"]}
                setnumber={detail["set number"]}
                rarity={detail["rarity"]}
                packName={detail["Search Tag"]}
                largeimage={<Largeimg url={detail["large image"]} k={detail["set number"]} modal={true} mobile={this.state.mobile}/>}
                mobile={this.state.mobile}
                carddetail={detail}
                />
      )
    }
    else
    {
      return(
        <Sample image={!this.state.mobile?<Largeimg url={detail["image"]} k={detail["name"]} w="100%" modal={false} mobile={this.state.mobile}/>:<Largeimg url={detail["image"]} k={detail["name"]} w="70%" modal={false} mobile={this.state.mobile}/> }
                name={detail["name"]}
                packName={detail["pack"]}
                description={detail["description"]}
                largeimage={<Largeimg url={detail["large image"]} k={detail["name"]} modal={true} mobile={this.state.mobile}/>}
                mobile={this.state.mobile}
                />
      )
    }
  }
  displayResult = () =>{
    const detail=this.props.location.state!==undefined?this.props.location.state.detail:/*!this.props.flag?*/this.props.location.detail/*:this.state.store*/
    if (detail=== undefined){
      return<h1>No keyword</h1>
    }
    if (Array.isArray(detail)){
      let sin=[];
      let set=[];
      let list=detail.map(d=>{
        return this.readyThebox(d)
      })


      if(this.state.flagSets || this.state.flagSingles){
        detail.forEach((d)=>{
          if(d["name"]===d["obj key"]){
            set.push(this.readyThebox(d))
          }else{
            sin.push(this.readyThebox(d))
          }
        });

        if(this.state.flagSets){
          return set;
        }
        if(this.state.flagSingles){
          return sin;
        }
      }


      return list

    }
    return this.readyThebox(detail)

  }

  handlePagination=(list)=>{
    if (list.length>50) {
      const { classes } = this.props;
      const { currentPage, todosPerPage } = this.state;
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = list.slice(indexOfFirstTodo, indexOfLastTodo);

      const renderTodos = currentTodos.map((list, index) => {
          return list;
        });

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(list.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
          return (
            <Grid item xs={0}>
              <Button color="primary" className={classes.buttonPage} onClick={()=>this.handleClickpage(number)}>
                {number}
              </Button>
              </Grid>
          );
        });

        return (
          <div>
          {renderTodos}
            <Paper className={classes.rootPagenumber}>
              <Grid container spacing={0}>
                {renderPageNumbers}
              </Grid>
            </Paper>
          </div>
          );

      //return list;
    }
    return list;
  }

  getSingles = ()=>{
    //console.log("Singles Clicked")
    this.setState({flagSingles:true,
                    flagSets:false})
  }

  getSets = ()=>{
    //console.log("Sets Clicked")
    this.setState({flagSingles:false,
                    flagSets:true})
  }
  handleChange = event => {

    this.setState({
      selectedValue: event.target.value,
    }, () => {
      if (this.state.selectedValue==='Sets'){
        this.getSets();
      }
      else if(this.state.selectedValue==='Singles'){
        this.getSingles();
      }
    })
 };

 renderDesktop=(sets,singles)=>{
   const { classes } = this.props;
   //console.log(this.props.location.query)
   return(
     <div>
     <Grid container className={classes.mainGrid}>
         <Grid item className={classes.subGrid1}>
         <Paper className={classes.rootDesktop}>
           <Grid container spacing={12}>
                           <FormControl component="fieldset" className={classes.formControl}>
                             <FormLabel component="legend">Filters:</FormLabel>
                             <RadioGroup
                               aria-label="Filters"
                               name="gender1"
                               className={classes.group}
                               value={this.state.selectedValue}
                               onChange={this.handleChange}
                             >
                               <FormControlLabel value="Singles" control={<Radio />} label="Singles" />
                               <FormControlLabel value="Sets" control={<Radio />} label="Sets" />
                             </RadioGroup>
                           </FormControl>
              </Grid>
           </Paper>
         </Grid>
         <Grid item className={classes.subGrid2}>
       {this.props.location.state!==undefined || this.props.location.query!==undefined?<Paper className={classes.root}>
                                                 <Grid container spacing={24}>
                                                   <Grid item xs={12}>
                                                     <Typography gutterBottom variant="subtitle1">
                                                     {this.props.location.state!==undefined?`${this.props.location.state.detail.length} results matching "${this.props.location.state.query}"`:
                                                       `${this.props.location.detail.length} results matching "${this.props.location.query}"`
                                                     }
                                                     </Typography>
                                                   </Grid>
                                                 </Grid>
                                              </Paper>:null}
       {this.state.flagSingles?singles:this.state.flagSets?sets:this.handlePagination(this.displayResult())}
       </Grid>
     </Grid>
     <Renderbacktotop scrollStepInPx="300" delayInMs="5"/>
     </div>
   );
 }

renderMobile=(sets,singles)=>{
  const { classes } = this.props;
  return (
    <div>
      <Grid container spacing={24} className={classes.mainGrid}>
        <Grid item xs={12} className={classes.subGridMobile}>
          <Paper className={classes.rootMobile}>
            <Grid container spacing={12}>

              {this.props.location.state!==undefined || this.props.location.query!==undefined?this.props.location.state!==undefined?<Typography className={classes.filterMobileStyleResult}>
                {`${this.props.location.state.detail.length} results`}
              </Typography>:<Typography className={classes.filterMobileStyleResult}>
                {`${this.props.location.detail.length} results`}
              </Typography>:null}

              <Typography className={classes.filterMobileStyle}>Singles</Typography>
                <Radio
                   checked={this.state.selectedValue === 'Singles'}
                   onChange={this.handleChange}
                   value="Singles"
                   name="radio-button-demo"
                   aria-label="Singles"

                 />
                 <Typography className={classes.filterMobileStyle}>Sets</Typography>
                 <Radio
                   checked={this.state.selectedValue === 'Sets'}
                   onChange={this.handleChange}
                   value="Sets"
                   name="radio-button-demo"
                   aria-label="Sets"

                 />
                 </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} className={classes.mobileMain}>
          {this.state.flagSingles?singles:this.state.flagSets?sets:this.handlePagination(this.displayResult())}
        </Grid>
      </Grid>
    </div>
  )
}

//componentDidMount =()=>{

//}



/*goBack=()=>{
  console.log("back clicked")
  if(this.props.searchStore.length!==1){
    <Redirect to={{
      pathname:"/search"+this.props.searchStore[this.props.searchStore.length-1]['keyword'],
      detail:"/search"+this.props.searchStore[this.props.searchStore.length-1]['data']
    }}/>
    let newArr=this.props.searchStore.slice();
    newArr.pop()
    this.props.search(newArr,true)
  }

  this.setState({
    store:this.props.searchStore.length===1?this.props.searchStore[this.props.searchStore.length-1]:this.props.searchStore[this.props.searchStore.length-2]
  },()=>{
    let newArr=this.props.searchStore.slice();
    newArr.pop()
    this.props.search(newArr,true)
  })
}*/
  render(){
    //console.log(this.props.location.checkload)
    //console.log(this.state.selection)
    //console.log(this.props.location.pathname)
    //console.log(this.props.location.detail)
    const { classes } = this.props

    let sets=[];
    let singles=[];
    if(this.state.flagSets){
      sets=this.handlePagination(this.displayResult())
    }
    if(this.state.flagSingles){
      singles=this.handlePagination(this.displayResult())
    }


//console.log(this.props.searchStore)
    //const results=!this.state.mobile?this.renderDesktop(sets,singles):this.renderMobile(sets,singles)
    //this.props.search(this.storeResults(sets,singles));
    return (
      <div>

      {this.props.location.state!==undefined?
        <div>
        <Mainheaderbar/>
          {!this.state.mobile?this.renderDesktop(sets,singles):this.renderMobile(sets,singles)}
          </div>:
        this.props.location.pathname.replace('/search','').replace('/','')!=='' && this.props.location.detail===undefined?
        <div>
        <Mainheaderbar cache={this.props.location.pathname.replace('/search','').replace('/','')}/>

          </div>:
        <div>
        <Mainheaderbar/>
          {!this.state.mobile?this.renderDesktop(sets,singles):this.renderMobile(sets,singles)}
          </div>
      }



      </div>
    )
  }
}


About.propTypes = {
  classes: PropTypes.object.isRequired,
};
/*
const mapStateToProps = state => {
  return {
    searchStore:state.search.results,
    flag:state.search.flag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: (history,check)=>dispatch(actionCreators.searchHistory(history,check))
  };
};

*/
export default withStyles(styles)(About);
//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(About));



/*{

  this.props.searchStore.length>1? this.props.searchStore[this.props.searchStore.length-2]['query1']===undefined?<Link to={{
                                        pathname:"/search/"+this.props.searchStore[this.props.searchStore.length-2]['keyword'],
                                        detail:this.props.searchStore[this.props.searchStore.length-2]['data']
                                      }}>
                                      <Button size="small" className={classes.buttonTop} onClick={ () => { this.goBack(); }}>
                                                <img src={back} alt='back'/>
                                      </Button>
                                      </Link>:
                                      <Link to={{
                                              pathname:"/search/"+this.props.searchStore[this.props.searchStore.length-2]['keyword'],
                                              detail:this.props.searchStore[this.props.searchStore.length-2]['data'],
                                              query:this.props.searchStore[this.props.searchStore.length-2]['query1'],
                                              }}>

                                          <Button size="small" className={classes.buttonTop} onClick={ () => { this.goBack(); }}>
                                                <img src={back} alt='back'/>
                                          </Button>
                                      </Link>
                                      :null
}*/
