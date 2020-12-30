import React from 'react';
import axios from 'axios'

export class EditItem extends React.Component {
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

    componentDidMount() {
        axios.get('http://localhost:4000/api/items/' + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    _id: response.data._id,
                    name: response.data.Name,
                    slot: response.data.Slot,
                    price: response.data.Price,
                    imgUrl: response.data.ImgUrl
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }
    //method to check if the information is stored 
    onSubmit(e) {
        e.preventDefault();
        const editMovie = {
            _id: this.state._id,
            Name: this.state.name,
            Slot: this.state.slot,
            Price: this.state.price,
            ImgUrl: this.state.imgUrl

        }
        //HTTP client that allows us to make GET and POST requests from the browser
        axios.put('http://localhost:4000/api/items/' + this.state._id, editMovie)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            });

    }

    //method to change the name information for the object in the this.state  
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    //method to change the Slot information for the object in the this.state 
    onChangeSlot(e) {
        this.setState({
            slot: e.target.value
        });
    }
    //method to change the Price information for the object in the this.state 
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    //method to change the ImgUrl information for the object in the this.state 
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
                    <input type='submit' value='Update Item' className='btn btn-primary'></input>
                </div>
            </form>
        </div>
        )
    }
}