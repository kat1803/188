import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import Container from 'react-bootstrap/Container';




const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  textfield: {
    margin: theme.spacing(2),
  }
}));


function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
      <div> Welcome to Kickstarter Prediction</div>
      </header>
      <div >
      <body>
        <Typography>
        Please enter your project details for prediction
        </Typography>   
        </body>
        <div>
        <Container>
              <TextField
                    id="date"
                    label="Project startdate"
                    type="date"
                    defaultValue="2017-05-24"
                    //className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
              <TextField
              className={classes.textfield}
              id="outlined-multiline-static"
              label="Blurb"
              multiline
              rows="4"
              defaultValue="Please enter your project description"
              margin="normal"
              variant="outlined"
            > hello </TextField>  
      </Container>
      <Button variant="contained" color="primary" classNAme={classes.button}>
              predict
            </Button>
        </div>

        </div>
    </div>
  );
}

export default App;

/*<div>
          <Paper className={classes.paper}>
          <TextField
              id="date"
              label="Project startdate"
              type="date"
              defaultValue="2017-05-24"
              //className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Paper>
          <Paper className={classes.paper}>
          <TextField
              id="outlined-multiline-static"
              label="Blurb"
              multiline
              rows="4"
              defaultValue="Please enter your project description"
              //className={classes.textField}
              margin="normal"
              variant="outlined"
            />  
          </Paper>
          </div>
          */