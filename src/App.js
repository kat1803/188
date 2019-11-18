import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//import About from './About.js';

const styles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    marginTop: 10,
    marginBottom: 10
  },
  textfield: {
    margin: theme.spacing(2)
  },
  paper: {
    verticalAlign: "middle",
    width: 400
  },
  container: {
    display: "flex",
    margin: theme.spacing(5),
    marginLeft: 300
  }
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      description: "",
      start_date: "",
      end_date: "",
      goal: 0,
      about: false
    };
  }

  setExample1() {
    this.setState({
      about: false,
      project_name: "Worlds & Creatures, the Art of Anthony Christou",
      start_date: "2017-05-08",
      end_date: "2017-05-29",
      goal: "5000",
      description:
        "A 100 page Artbook featuring the work of Anthony Christou over the last 5 years. Art from the genres of fantasy, myths, horror & more."
    });
  }
  setExample2() {
    this.setState({
      about: false,
      project_name: "MOVIE - Messages",
      start_date: "2017-02-21",
      end_date: "2017-02-23",
      goal: "2500000",
      description:
        "Humanity is slowly altering the world in a dangerous way. Someone realises this and reaches out to humanity, but needs to work out how.	"
    });
  }
  setHome() {
    this.setState({
      project_name: "",
      description: "",
      start_date: "",
      end_date: "",
      goal: 0,
      about: false
    });
  }

  setAbout() {
    this.setState({
      about: true
    });
  }

  descriptionUpdate(event) {
    this.setState({ description: event.target.value });
  }
  projectNameUpdate(event) {
    this.setState({ project_name: event.target.value });
  }
  startDateUpdate(event) {
    this.setState({ start_date: event.target.value });
  }
  endDateUpdate(event) {
    this.setState({ end_date: event.target.value });
  }
  goalUpdate(event) {
    this.setState({ goal: event.target.value });
  }

  render() {
    console.log(this.state);
    const classes = this.props.classes;
    var dt1 = new Date(this.state.start_date);
    var dt2 = new Date(this.state.end_date);
    var days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    if (isNaN(days) || days < 0) {
      days = 0;
    }
    var goal = parseInt(this.state.goal);
    var features = {
      goal: goal,
      name_length: this.state.project_name.length,
      description_length: this.state.description.length,
      days: days
    };
    var transform = {'goal': 100000000.0, 'name_length': 242, 'description_length': 763, 'days': 92};
    var coefs = {'goal': -1.4906066972429919e-05, 'name_length': 0.017765474581673258, 'description_length': -0.001322235548010572, 'days': -0.01473085765457943};
    var intercept = -1.84791707e-05;
    
    var total = intercept;
    for ((key, value) in features) {
      total += coefs[key] * value / transform[key];
    }
    var pct_predict = 100 * 1/(1+Math.pow(Math.E, -1 * total));
    console.log(pct_predict);

    return (
      <div className="App">
        <header className="App-header">
          <h1> Welcome to Kickstarter Prediction</h1>
          <div>
            <Button
              color="secondary"
              className={classes.button}
              onClick={() => this.setHome()}
            >
              Home
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={() => this.setExample1()}
            >
              Project example 1
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={() => this.setExample2()}
            >
              Project example 2
            </Button>
            <Button
              color="secondary"
              className={classes.button}
              onClick={() => this.setAbout()}
            >
              About
            </Button>
          </div>
        </header>

        {this.state.about ? (
          "About blah blah blah"
        ) : (
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
                  onChange={this.projectNameUpdate.bind(this)}
                  value={this.state.project_name}
                />
                <TextField
                  id="date"
                  label="Project startdate"
                  type="date"
                  variant="outlined"
                  className={classes.textfield}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.startDateUpdate.bind(this)}
                  value={this.state.start_date}
                />
                <TextField
                  id="date"
                  label="End date"
                  type="date"
                  variant="outlined"
                  className={classes.textfield}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.endDateUpdate.bind(this)}
                  value={this.state.end_date}
                />
                <TextField
                  id="outlined-basic"
                  className={classes.textfield}
                  label="Goal"
                  margin="normal"
                  variant="outlined"
                  onChange={this.goalUpdate.bind(this)}
                  value={this.state.goal}
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
                  onChange={this.descriptionUpdate.bind(this)}
                  value={this.state.description}
                />
              </Paper>
              <Paper style={{ marginLeft: 50, width: 400 }}>
                <h2>Features</h2>

                {Object.keys(features).map((key, index) => (
                  <p key={index}>
                    {key}: {features[key]}
                  </p>
                ))}
                <h2>Prediction</h2>
                <p>hello</p>
                <p>{pct_predict}%</p>
              </Paper>
            </div>
          </h2>
        )}
      </div>
    );
  }
}
/*

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Start to predict
                </Button>
                */
export default withStyles(styles)(App);
