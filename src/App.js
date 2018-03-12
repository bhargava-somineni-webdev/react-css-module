import React, { Component } from 'react';
import classes from './App.css'; //since we used css modules we can 
//now import all the classes inside App.css as properties of the 'classes' object
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "sam", age: "10" },
      { id: "2", name: "dan", age: "40" },
      { id: "3", name: "jenny", age: "20" }
    ],
    username: '',
    userInput: ''
  }

  //below method used to toggle the showPersons flag to true/false
  //based on its previous value. If this is true we show the persons div
  //if not we hide it
  togglePersonsHandler = () => {
    let doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }


  //nameChange is called on Person component input box element change.
  //We have the input box inside the Person.js file.
  nameChangeHandler = (event, personId) => {
    let personIndex = this.state.persons.findIndex(person => {
      return person.id === personId
    })

    let person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;

    let persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }


  //onclick of a person list item, we are removing it from our state  
  deletePersonHandler = (personIndex) => {
    let persons = [...this.state.persons]; //we are making a copy of persons object from state
    //instead of directly mutating the state persons object using the spread operator
    persons.splice(personIndex, 1);//this removes one element starting from the index provided

    this.setState({
      persons: persons
    })
  }

  //assignment 2
  inputChangedHandler = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  //assignment 2
  deleteInputHandler = (inpIndex) => {
    const inp = this.state.userInput.split('');
    inp.splice(inpIndex, 1);
    const updateText = inp.join('');
    this.setState({
      userInput: updateText
    });
  }

  render() {
    //below code is used to do a conditional loading of the Persons div
    let persons = null;    
    let btnClass = '';
    
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, personIndex) => {
            return <Person
              click={this.deletePersonHandler.bind(this, personIndex)}
              name={person.name}
              age={person.age}
              key={person.id}
              change={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    //the below classes array is used to dynamically change a <p> className
    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      //instead of <div className="App"> now we have css module enabled so we can use below
      <div className={classes.App}>
        <p className={assignedClasses.join(' ')}>This is working!</p>
        {/*dynamic classname from assignedClasses array
        Eg: className='red bold'*/}
        <button className={btnClass} onClick={this.togglePersonsHandler}>Hide/Show Persons</button>
        {/*below we are doing a conditional loading of the Persons div*/}
        {persons}
        <div>
          <input
            onChange={this.inputChangedHandler}
            value={this.state.userInput} />
          <p>{this.state.userInput}</p>
        </div>
      </div>
    );
  }
}

export default App;
