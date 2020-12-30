import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {Link} from 'react-router-dom'

export class WowItems extends React.Component {
    constructor(){
        super();
        this.deleteWowItem = this.deleteWowItem.bind(this);
    }

    deleteWowItem(e){
        e.preventDefault();
        axios.delete("http://localhost:4000/api/items/"+this.props.item._id)
        .then(()=>{
            this.props.ReloadDataMethod();
        })
        .catch();
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.item.Name}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <div>{this.props.item.Slot}</div>
                        <img src={this.props.item.ImgUrl}></img>
                            <footer className="blockquote-footer">
                             Price: {this.props.item.Price} €
                            </footer> 
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/"+ this.props.item._id} className='btn btn-primary'>Edit</Link>
                    <Button variant="danger"  onClick={this.deleteWowItem}>Delete</Button>
                </Card>
            </div>
        )
    }
}