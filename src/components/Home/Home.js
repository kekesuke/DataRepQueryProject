import React from 'react';
import '../../App.css';
import {
    Button
} from 'reactstrap'
import Card from 'react-bootstrap/Card'


export class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <Card style={{ width: '28rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem', color: "white" }} border="success" className="bg-transparent mb-2" >
                    <Card.Img variant="top" src="https://i.gadgets360cdn.com/large/world-of-warcraft_1515269153610.jpg" />
                    <Card.Body>
                        <Card.Title>World Of Warcraft</Card.Title>
                        <Card.Text>
                            World of Warcraft is a massively multiplayer online role-playing game released in 2004 by Blizzard Entertainment. It is the fourth released game that is set in the Warcraft fantasy universe.
                         </Card.Text>
                        <Button variant="primary" href='/items'>Item Shop</Button>
                    </Card.Body>
                </Card>
            </div >
        )
    }
}

