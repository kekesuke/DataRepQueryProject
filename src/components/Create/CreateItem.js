import React from 'react';
import ItemModal from '../../components/AddItem/ItemModal'

export class CreateItem extends React.Component {


    render() {
        return (//divs/form/labels/input field to get the information and to be formated
            <div className='App'>
                <ItemModal></ItemModal>
            </div>
        )
    }
}