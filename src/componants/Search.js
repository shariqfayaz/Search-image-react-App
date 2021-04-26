import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Search extends React.Component{
    state= { 
        term:''
    };
    change = (e)=>{
        e.preventDefault();
        this.props.Onsubmit(this.state.term)
    }
    render(){
        return(
            <form onSubmit={this.change}>
            
                <TextField label="Search images" variant="outlined" size="medium"  style={{width:'85%'}} value={this.state.term} onChange={e=>this.setState({term:e.target.value})}></TextField>
                <Button variant="contained" color="primary" size="large" style={{width:'15%',height:'57px'}} onClick={this.change}> Search</Button>
            </form>
        );
    };
};
export default Search;