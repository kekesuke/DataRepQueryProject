import React from 'react';
import { Items } from './Items';
import axios from 'axios';

export class ShowItems extends React.Component {

    constructor() {
        super();
        this.ReloadDataMethod = this.ReloadDataMethod.bind(this);
    }

    state = {
        items: []

    };
    //every time a component change a promise is send to a website that return data either succesfull or unsuccsesfull
    componentDidMount() {
        //HTTP client that allows us to make GET and POST requests from the browser
        axios.get('http://localhost:4000/api/items')
            .then((response) => {
                this.setState({ items: response.data })//setStates doing UI update and calling the render method. 
            })
            .catch((error) => { // if its unfulfilled its gonna generate an error in the console
                console.log(error)
            });
    }

    ReloadDataMethod() {
        //HTTP client that allows us to make GET and POST requests from the browser
        axios.get('http://localhost:4000/api/items')
            .then((response) => {
                this.setState({ items: response.data })//setStates doing UI update and calling the render method. 
            })
            .catch((error) => { // if its unfulfilled its gonna generate an error in the console
                console.log(error)
            });
    }

    render() {
        return (
            <div>
                <h3>Wow Items</h3>
                <Items items={this.state.items} ReloadDataMethod={this.ReloadDataMethod}></Items>
            </div>
        )
    }
}