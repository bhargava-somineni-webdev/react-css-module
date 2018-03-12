import React from 'react';
import classes from './Person.css';


const Person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I'm {props.age}</p>
            <p>{props.children}</p>
            <input onChange={props.change} value={props.name} />
        </div>
    );
}

export default Person;