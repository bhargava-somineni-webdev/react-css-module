import React from 'react';
import './Person.css';


const Person = (props) => {
    return (
        <div className="person">
            <p onClick={props.click}>I'm {props.name} and I'm {props.age}</p>
            <p>{props.children}</p>
            <input onChange={props.change} value={props.name} />
        </div>
    );
}

export default Person;