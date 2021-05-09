import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

// Components
import Gap from '../../components/gap/Gap';

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('email', email)
        data.append('password', password)

        try {
            let res = await axios.post(`http://localhost:5000/api/user/login`, data, {
                headers: {
                  'content-type': 'multipart/form-data' 
                }
            })

            dispatch({
                type: 'LOGIN',
                payload: res.data
            })
            
            Swal.fire({
                title: 'Sukses',
                text: 'Selamat Datang',
                icon: 'success',
            })
            history.push('/')
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                title: 'Error',
                text: 'Pastikan anda mengisi form dengan benar',
                icon: 'error',
            })
        }
    }

    return (
    <div style={{width: "70%"}}>
        <Gap height="50px"/>
        <Form onSubmit={(e) => loginSubmit(e)}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" value={email || ""} onChange={e => setEmail(e.target.value)} name="email" id="email" placeholder="Email" required/>
            </FormGroup>
            <Gap height="30px"/>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" value={password || ""} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="Password" required/>
            </FormGroup>
            <Gap height="30px"/>
            <Button>Submit</Button>
        </Form>
    </div>
    )
}

export default Login
