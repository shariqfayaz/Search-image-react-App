import React from 'react';
import Search from './Search'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';





const useStyles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    display:'flex',
    flexWrap:'wrap',
    
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  paper: {
    margin:0,
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, images:[] };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
    
    

    onsubmit= async (e)=>{
        const response = await axios.get('https://api.unsplash.com/search/photos',
        {
            params:{query:e},
            headers:{
              Authorization : 'Client-ID r0fT-BaOIe1OSfyTHjZiFXYQCyWI__0cSLWv0ID55W4'  
            }
        });

        this.setState({images: response.data.results})
        console.log(response.data.results)
        console.log(this.state.width)
    }
    render(){
       
        const { classes }=this.props;
        
        return(
            // <div>
            //     <Grid container spacing={3} justify='center'>
            //         <Grid item xs={12} style={{backgroundColor:'aqua'}}>
            //         <Search Onsubmit={this.onsubmit}/>
            //         </Grid>
                  
            //             {
            //                 this.state.images.map(e=>{
            //                     return  <Grid item lg={4} key={e.id} className={classes.paper}  ><Paper ><img src={e.urls.small}  alt={e.alt_description}></img></Paper></Grid>
            //                 })
            //             }
                    
            //      </Grid>
            // </div>
            <React.Fragment>
                <div style={{backgroundColor:'aqua'}}>
                <Search Onsubmit={this.onsubmit}/>

                </div>
            <div className={classes.root}>
            <GridList spacing={2} className={classes.gridList} >
              {this.state.images.map((tile) => (
                
                <GridListTile  key={tile.id} cols={this.state.width<600?2:this.state.width<1000?1:0.5} rows={3}>
                  <img src={tile.urls.small} alt={tile.alt_description} />  
                   <GridListTileBar
                    title={tile.alt_description}
                    titlePosition="top"
                    actionIcon={
                      <IconButton aria-label={`star ${tile.alt_description}`} className={classes.icon}>
                        <StarBorderIcon/>
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          </React.Fragment>
        );
    };

};
export default withStyles(useStyles)(App);