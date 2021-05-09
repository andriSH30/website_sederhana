import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {ListGroup} from 'reactstrap';
import axios from 'axios';

// components
import List from '../../components/List/List';

const Customer = () => {
    const global = useSelector(state => state);
    const [datas, setDatas] = useState([])

    useEffect( () => {
        const load = async () => {
            try {
                let res = await axios.get(`http://localhost:5000/api/user/list`,{
                    headers: {
                        'x-auth-token': global.dataUser.token
                    }
                })
                
                setDatas(res.data)
            } catch (error) {
                console.log(error.status)
            }
        }
        load()
    }) 

    return (
        <Fragment>
            <ListGroup>
                {datas.map(data => {
                    return <List key={data._id} name={data.name} />
                })}
            </ListGroup>
        </Fragment>
    )
}

export default Customer
