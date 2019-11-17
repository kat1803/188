import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//import About from './About.js';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginTop:10,
    marginBottom: 10
  },
  textfield: {
    margin: theme.spacing(2),
  },
paper:{
  verticalAlign: 'middle',
  width:400
},
container:{
  display:'flex',
  margin: theme.spacing(5),
  marginLeft:300
}
}));


function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
          <h1> Welcome to Kickstarter Prediction</h1>
          <div>
          <Button color="secondary" className={classes.button} >
            Home
          </Button>
          <Button color="secondary" className={classes.button}>
            Project example
          </Button>
          <Button color="secondary" className={classes.button} >
            About
          </Button>
          </div>
      </header>
      <h2>
        <div className={classes.container}>
        <Paper className={classes.paper}>
              <Typography variant="h5">
              Please enter your project details for prediction
              </Typography>  
              <TextField
                id="outlined-basic"
                className={classes.textfield}
                label="Project name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                    id="date"
                    label="Project startdate"
                    type="date"
                    defaultValue="2017-05-24"
                    variant="outlined"
                    lassName={classes.textfield}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              <TextField
                    id="date"
                    label="End date"
                    type="date"
                    defaultValue="2017-05-24"
                    variant="outlined"
                    className={classes.textfield}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            <TextField
                id="outlined-basic"
                className={classes.textfield}
                label="Goal"
                margin="normal"
                variant="outlined"
              />
            <TextField
              className={classes.textfield}
              id="outlined-multiline-static"
              label="Blurb"
              multiline
              rows="4"
              //defaultValue="Please enter your project description"
              margin="normal"
              variant="outlined"
            > hello </TextField>  
            <Button variant="contained" color="primary" classNAme={classes.button}> Start to predict</Button>            
      </Paper>
      <Paper style={{marginLeft:50,width:400}}>
              <h2>Prediction Result</h2>
      </Paper>
        </div>

        </h2>
    </div>
  );
}


export default App;