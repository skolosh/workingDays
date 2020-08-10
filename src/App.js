import React, { Component } from 'react' 
import Navbar from './components/Navbar'
import Calender from './components/calender'

class App extends Component {
  render (){
    return(
      <div>
        <Navbar />
        <Calender /> 
      </div>
    );
  }
}

export default App;
