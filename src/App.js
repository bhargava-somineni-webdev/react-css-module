import React, { Component } from 'react';
import './App.css';
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
    //this style object is used for inline styling of button
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      padding: '8px',
      border: '1px solid blue'
    }


    //below code is used to do a conditional loading of the Persons div
    let persons = null;
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

      style.backgroundColor = 'red'; // we are dynamically changing the button color,
      //by modifying the style object which we used for our button inline styling
    }

    //the below classes array is used to dynamically change a <p> className
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <p className={classes.join(' ')}>This is working!</p> {/*dynamic classname from classes array
        Eg: className='red bold'*/}
        <button style={style} onClick={this.togglePersonsHandler}>Hide/Show Persons</button>
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
