import React from 'react';
import { WowItems } from '../WowItems/WowItems';


export class Items extends React.Component{

    render(){
        return this.props.items.map((items)=>{
            return <WowItems key={items._id} item={items}
            ReloadDataMethod={this.props.ReloadDataMethod}></WowItems>
            });
            
            

    }
}