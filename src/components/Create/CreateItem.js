import React from 'react';
import axios from 'axios'

export class CreateItem extends React.Component {
    constructor() {
        super();
        //we need to bind the event handlers on constructor so we can use them among other events.
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSlot = this.onChangeSlot.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImgUrl = this.onChangeImgUrl.bind(this);

        //Initializing local state by assigning an object to this.state
        this.state = {
            name: '',
            slot: '',
            price: '',
            imgUrl: '',
        }
    }
    //method to check if the information is stored 
    onSubmit(e) {
        e.preventDefault();
        alert("Movie:" + this.state.title + " " + "year: " + this.state.year + " " + this.state.poster + " Added.");
        //object
        const newWowItem = {
            name: this.state.name,
            slot: this.state.slot,
            price: this.state.price,
            imgUrl: this.state.imgUrl
        }
        //HTTP client that allows us to make GET and POST requests from the browser
        axios.post('http://localhost:4000/api/items', newWowItem)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });

    }

    //method to change the title information for the object in the this.state  
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    //method to change the year information for the object in the this.state 
    onChangeSlot(e) {
        this.setState({
            slot: e.target.value
        });
    }

    //method to change the year information for the object in the this.state 
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    //method to change the poster information for the object in the this.state 
    onChangeImgUrl(e) {
        this.setState({
            imgUrl: e.target.value
        });
    }
    render() {
        return (//divs/form/labels/input field to get the information and to be formated
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Item Name</label>
                        <input type='text'
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <label>Item Slot</label>
                        <input type='text'
                            className="form-control"
                            value={this.state.slot}
                            onChange={this.onChangeSlot}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <label>Item Price</label>
                        <input type='number'
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <label>Item Img URL</label>
                        <input type='text'
                            className="form-control"
                            value={this.state.imgUrl}
                            onChange={this.onChangeImgUrl}>
                        </input>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Add WoW Item' className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        )
    }
}