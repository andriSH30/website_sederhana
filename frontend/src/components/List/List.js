import React from 'react';
import { ListGroupItem } from 'reactstrap';

const List = (props) => {
    return (
        <ListGroupItem>{props.name}</ListGroupItem>
    )
}

export default List
