import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div> Welcome to Kickstarter Prediction</div>
      </header>
      <body>
      hello
      <form>
  <TextField
    id="date"
    label="Birthday"
    type="date"
    defaultValue="2017-05-24"
    //className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
</form>
      </body>
    </div>
  );
}

export default App;
