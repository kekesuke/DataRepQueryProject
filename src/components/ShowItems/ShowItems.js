import React from 'react';
import ShoppingList from '../ShoppingList/ShoppingList';

export class ShowItems extends React.Component {

    render() {
        return (
            <div>
                <h3>Wow Items</h3>
                <ShoppingList></ShoppingList>
            </div>
        )
    }
}