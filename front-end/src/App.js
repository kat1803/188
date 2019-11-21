import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import MenuItem from "@material-ui/core/MenuItem";
import { red } from "@material-ui/core/colors";

//style for the website
const styles = {
  button: {
    margin: 2,
    marginTop: 10,
    marginBottom: 10
  },
  textfield: {
    margin: 2,
    marginTop: 25
  },
  paper: {
    flexDirection: 'row',
    width: 600
  },
  container: {
    display: "flex",
    margin: 5,
    marginLeft: 300
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      description: "",
      start_date: "",
      category: "",
	  end_date: "",
	  prediction: 0,
      goal: 0,
      about: false
	};
	this.callAPI = this.callAPI.bind(this)
  }

  async callAPI(){
	  let {goal, description, start_date, end_date, project_name, category} = this.state
	  if (      
		  project_name !== "" &&
	      description !== "" &&
	      start_date !== "" &&
	      category !== "" &&
		  end_date !== ""
		  ){
			const Length_of_kick = (new Date(end_date).getTime() - new Date(start_date).getTime())/(1000*60*60*24)
			  try {
				  const response = await fetch(`http://localhost:8000/predict?goal=${goal}&name=${project_name}&blurb=${description}&Length_of_kick=${Length_of_kick}`);
				  const result = await response.json();
				  console.log('Success:', result);
				  this.setState({prediction: result.result})
				} catch (error) {
				  console.error('Error:', error);
				}
			  
		  }
		  else{
			  alert("Please enter all input!")
		  }
  }

  setExample1() {
    this.setState({
      about: false,
      category: "comics",
      project_name: "The Postnatalist - Second issue comic book",
      start_date: "2014-12-12",
      end_date: "2015-01-26",
      goal: "300",
      description:
        "The Postnatalist explores feminist issues involving women's rights to occupy public spaces. World's first middle-aged female superhero."
    });
  }
  setExample2() {
    this.setState({
      about: false,
      category: "technology",
      project_name: "DSM-5 Cats",
      start_date: "2014-12-16",
      end_date: "2015-01-15",
      goal: "300",
      description:
        "Using GPS tracking data on cat movements I applied the DSM-5 criteria to label them all with disorders based on 24 hours of data."
    });
  }
  setHome() {
    this.setState({
      project_name: "",
      description: "",
      start_date: "",
      end_date: "",
      category: "",
      goal: 0,
      about: false
    });
  }

  setAbout() {
    this.setState({
      about: true
    });
  }
/*
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
  categoryUpdate(event) {
    this.setState({ category: event.target.value });
  }
*/
  render() {
    var categories = [
      "publishing",
      "art",
      "fashion",
      "comics",
      "games",
      "film&video",
      "design",
      "crafts",
      "journalism",
      "food",
      "music",
      "photography",
      "technology",
      "theater",
      "dance"
    ];
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
      goal: isNaN(goal) ? 0 : goal,
      name_length: this.state.project_name.length,
      description_length: this.state.description.length,
      days: days
    };
    if (categories.indexOf(this.state.category) > -1) {
      features[this.state.category] = 1.0;
    }
    var transform = {
      goal: 100000000.0,
      name_length: 242,
      description_length: 763,
      days: 92,
      publishing: 1,
      art: 1,
      fashion: 1,
      comics: 1,
      games: 1,
      "film&video": 1,
      design: 1,
      crafts: 1,
      journalism: 1,
      food: 1,
      music: 1,
      photography: 1,
      technology: 1,
      theater: 1,
      dance: 1
    };
    var coefs = {
      goal: -4.2221198241883995,
      name_length: 4.145044195316219,
      description_length: -0.6202055266240084,
      days: -1.991208065816051,
      publishing: -0.3776067434848402,
      art: -0.20885380796643244,
      fashion: -0.26289449342401283,
      comics: 0.9099633593130975,
      games: 0.5973826097934369,
      "film&video": 0.1320937998119649,
      design: 2.0821077631224947,
      crafts: -0.9927932045870127,
      journalism: -1.3679535879868938,
      food: -0.8497531396038208,
      music: 0.45272430045111817,
      photography: -0.5736926094462507,
      technology: -0.8641835291452311,
      theater: 0.514510919036007,
      dance: 0.8633542221158385,
    };
    var intercept = 0.05440586;
    
    var total = intercept;
    for (var key in features) {
      total += (coefs[key] * features[key]) / transform[key];
    }
    var pct_predict = (100 * 1) / (1 + Math.pow(Math.E, -1 * total));

    return (
      <div className="App">
        <header className="App-header">
          <h1> Welcome to Kickstarter Prediction</h1>
          <div>
            <Button
              color="secondary"
              onClick={() => this.setHome()}
            >
              Home
            </Button>
            <Button
              color="secondary"
              style={styles.button}
              onClick={() => this.setExample1()}
            >
              Project example 1
            </Button>
            <Button
              color="secondary"
              //className={classes.button}
              onClick={() => this.setExample2()}
            >
              Project example 2
            </Button>
            <Button
              color="secondary"
              //className={classes.button}
              onClick={() => this.setAbout()}
            >
              About
            </Button>
          </div>
        </header>

        {this.state.about ? (
          <Paper style={{alignSelf:'center', width: 500, margin:10, marginLeft: '30%', fontSize: 25}}>
            <br/>
            Kickstarter prediction is the website that allow people to enter their project and predict the probability of achiveing their goal.
            <br/>
            <br/>
            Hope you can test it and enjoy it. 
            <br/>
            <br/>
            and give us some feedback
            <br/>
            <br/>
            Developers for this project are:
            <br/>
            <br/>
            Nhi Tran 
            <br/>
            <br/>
            Phuc Le 
            <br/>
            <br/>
            Zhonglin 
            <br/>
            <br/>
            Thank you
            <br/>
            <br/>
          </Paper>
          
        ) : (
          <h2>
            <div style={styles.container}>
              <Paper style={{verticalAlign: "middle", width: 400}}>
                <Typography variant="h5">
                  Please enter your project details for prediction
                </Typography>
                <div>
                <InputLabel id="label1">Category</InputLabel>
                <Select
                style={styles.textfield}
                  labelId="label1"
                  id="label"
                  value={this.state.category.value}
                  onChange={(event)=> this.setState({category: event.target.value })}
                >
                  {categories.map(category => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                </Select>
                </div>
                <TextField
                  id="outlined-basic"
                  style={styles.textfield}
                  label="Project name"
                  margin="normal"
                  variant="outlined"
                  onChange={(event)=> this.setState({project_name: event.target.value })}
                  value={this.state.project_name}
                />
                <TextField
                style={styles.textfield}
                  id="date"
                  label="Project startdate"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event)=> this.setState({start_date: event.target.value })}
                  value={this.state.start_date}
                />
                <TextField
                style={styles.textfield}
                  id="date"
                  label="End date"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
				  onChange={(event)=> this.setState({end_date: event.target.value })}
                  value={this.state.end_date}
                />
                <TextField
                  id="outlined-basic"
                  style={styles.textfield}
                  label="Goal"
                  margin="normal"
                  variant="outlined"
                  onChange={(event)=> this.setState({goal: event.target.value })}
                  value={this.state.goal}
                />
                <TextField
                  style={styles.textfield}
                  id="outlined-multiline-static"
                  label="Blurb"
                  multiline
                  rows="4"
                  //defaultValue="Please enter your project description"
                  margin="normal"
                  variant="outlined"
                  onChange={(event)=> this.setState({description: event.target.value })}
                  value={this.state.description}
                />
                 <Button
                  variant="contained"
                  color="primary"
				  style={styles.button}
				  onClick={this.callAPI}
                >
                  Start to predict
                </Button>
              </Paper>
              <Paper style={styles.paper}>
                <h2>Features</h2>
                  <Typography style={{fontSize:25}}>
                  {Object.keys(features).map((key, index) => (
                  <p key={index}>
                    {key}: {features[key]}
                  </p>
                ))}
                  </Typography>
                
                <h2>Prediction Result</h2>
                <p >
                  {(this.state.prediction*100).toFixed(1)} % chance of meeting the
                  goal
                </p>
                {/* <p >
                  {Math.round(pct_predict * 10) / 10} % chance of meeting the
                  goal
                </p> */}
              </Paper>
            </div>
          </h2>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
