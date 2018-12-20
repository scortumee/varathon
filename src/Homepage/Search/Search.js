import React, {PureComponent } from 'react'
import './Search.css'
import axios from 'axios'
import {Link,Redirect} from "react-router-dom"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import searchIcon from "../assets/searchIcon.svg";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const styles = theme => ({
  root: {
    minwidth: 775,
    backgroundColor: theme.palette.background.paper,
    display:'inline-flex',
    flexDirection: 'column',
    position:'absolute',
    marginTop: '5%',
  },
  button: {
    //margin: theme.spacing.unit,
    marginTop:'14%',
    height:47,
    marginLeft:'-22%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '50vw',
  },
  progress: {
   //margin: theme.spacing.unit * 2,
   marginLeft:'auto',
   marginRight:'auto'
 },
});

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item['name']] !== 1) {
               seen[item['name']] = 1;
               out[j++] = item;
         }
    }
    //console.log(out);
    return out;
}

class Search extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      query:'',
      results:[],
      onInput:false,
      enterPressed:false,
      url:'',
      loading:false,
      loadingEnter:false,
      savedQuery:'',
      resultWait:0,
      count:0,
      loadingCache:true,
    }
  }

  getInfoCache=()=>{
    //console.log('cache is wokring')
    axios.get('https://us-central1-varathon-a9121.cloudfunctions.net/search?keyword='+this.props.cache)
         .then(({ data }) => {
           this.setState({
             loadingCache:false,
             results: data,
             //count:this.state.count+1,
           })
         })
    this.setState({
      loadingCache:true,
      //enterPressed:false,
      //resultWait:this.state.resultWait+1
    })
  }

  getInfo = () => {

    axios.get('https://us-central1-varathon-a9121.cloudfunctions.net/search?keyword='+this.state.query)
         .then(({ data }) => {
           this.setState({
             loading:false,
             results: data,
             count:this.state.count+1,
           })
         })
    this.setState({
      loading:true,
      //enterPressed:false,
      resultWait:this.state.resultWait+1
    })
  }

  getInfoEnter =()=>{

    //console.log(this.state.query)
    axios.get('https://us-central1-varathon-a9121.cloudfunctions.net/search?keyword='+this.state.query)
         .then(({ data }) => {
           this.setState({
             loadingEnter:false,
             results: data,
           }/*,()=>{
             let newArr=this.props.searchStore.slice();
             newArr.push({
               data:data,
               keyword:this.state.savedQuery,
               query1:this.state.savedQuery
             })
             this.props.search(newArr,false)
           }*/)
         })
    this.setState({
      loadingEnter:true,
      //enterPressed:false,
      //resultWait:this.state.resultWait+1
    })

  }

  handleInputChange = (e) => {
    this.setState({
      query: /*this.search.value*/ e.target.value,
      savedQuery:e.target.value,
      enterPressed:false
    }, () => {
      if (this.state.query && this.state.query.length > 2) {
        if (this.state.query.length % 3 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
        //console.log('this happened')
        this.setState({
          results: []
        })
      }
    })
  }

  checkClick=()=>{
    //console.log("Clicked")
  }
  checkLeave=()=>{
    this.setState({
      query:''
    })
  }

  displayResults=()=>{
    //console.log(this.state.results)
    let options=[]
    if (this.state.results!==[]){

         options = uniq_fast(this.state.results).slice(0,10).map(r => (
           <Link to={{
             pathname:"/search/"+r['name'],
             detail:r
           }} style={{textDecoration: 'none'}}
           >
           <ListItem button onClick={()=>{

             this.setState({
               query:''
             }/*,()=>{
               //console.log('recomendation stored')

               let newArr=this.props.searchStore.slice();
               newArr.push({
                 data:r,
                 keyword:r['name']
               })
               this.props.search(newArr,false)
             }*/)
           }}>
              <ListItemText inset primary={r['name'].replace(/_/g," ")} secondary={r['card details']===undefined ? r['pack']:r['Search Tag']}/>
           </ListItem>
           </Link>
          ))

      }
      return options
  }

  handleKeyPress =(e) =>{
    if(e.key==='Enter'){
      //console.log('Enter pressed')
      this.getInfoEnter()
      this.setState({
        enterPressed:true,
        query:''
      })
    }
  }
    resetKeypress =()=>{
      this.setState({
        enterPressed:false,
        loading:false
      })
  }

  render() {
    //if(this.props.enterKey){
      //this.resetKeypress()
  //  }
  //  if(this.props.resetLoad){
    //  this.resetLoad()
  //  }
    const { classes } = this.props;
  //  //console.log(this.state.loading)
  if (this.props.cache!==undefined){
    this.getInfoCache()
  }
  //console.log(this.props.cache)
  if (this.state.enterPressed && !this.state.loadingEnter){
    history.push({
    pathname:"/search/"+this.state.savedQuery,
    state:{
      detail:this.state.results,
      query:this.state.savedQuery,
    }
  //  ,
  //
  })
  }
    return (
      <div className="dropdown">

            <TextField
              id="outlined-search"
              label="Search for"
              type="search"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
          />

          <Link to={{
            pathname:"/search/"+this.state.savedQuery,
            detail:this.state.results,
            query:this.state.savedQuery,
            //checkload:this.state.loading,
          }}>

          <Button variant="contained" className={classes.button} onClick={this.checkLeave} >
            <img src={searchIcon} alt="search icon"/>
          </Button>
          </Link>
          {this.state.loading?<div className="dropdown-content-loading">
                                <CircularProgress className={classes.progress} size={50} />
                              </div>:this.state.results.length!==0 && this.state.query!==''?<div className="dropdown-content">
                                                                                              <List component="nav" >
                                                                                                {this.displayResults()}
                                                                                              </List>
                                                                                            </div>:null}
            {this.state.enterPressed ?!this.state.loadingEnter ? history.go():<CircularProgress className={classes.progress} size={20} />
                                            :null}
                                                  {
                                                    this.props.cache===undefined?null:!this.state.loadingCache?<Redirect to={{pathname:"/search/"+this.props.cache,
                                                                                            detail:this.state.results,
                                                                                            //enterKey:this.state.enterPressed,
                                                                                            query:this.props.cache,
                                                                                            //checkload:this.state.loading,
                                                                                          }} />:<CircularProgress className={classes.progress} size={30} />
                                                  }


      </div>
    )
  }
}
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

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};
*/
export default withStyles(styles)(Search);
//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));

/* !this.state.loadingEnter?<Redirect to={{pathname:"/search?query="+this.state.savedQuery,
                                        detail:this.state.results,
                                        //enterKey:this.state.enterPressed,
                                        query:this.state.savedQuery,
                                        //checkload:this.state.loading,
                                      }} />*/
/*  :<CircularProgress className={classes.progress} size={40} />*/
