import React, { Component } from 'react'
import {
    Container,
    ListGroup,
    Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Card from 'react-bootstrap/Card'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../../Actions/ItemActions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    render() {

        const { items } = this.props.item;

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name, price, slot, imgUrl }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <Card style={{ width: '28rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }} border="success" className="bg-transparent mb-2" >
                                    <Card.Header className="whiteColor">{name}</Card.Header>
                                    <Card.Body>
                                        <Card.Text className="whiteColor" >{slot}</Card.Text>
                                        <Card.Img variant="top" src={imgUrl} alt="wrong url" />
                                        <Card.Text className="whiteColor">Price: {price} €</Card.Text>
                                    </Card.Body>
                                    <div>
                                        <Link to={"/edit/" + _id} className='btn btn-primary' size="md">Edit</Link>
                                    </div>
                                    <div>
                                        <Button className="remove-btn" color="danger" size="md" onClick={
                                            this.onDeleteClick.bind(this, _id)}>&times;</Button>
                                    </div>
                                </Card>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)