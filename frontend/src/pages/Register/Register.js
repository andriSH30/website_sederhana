import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

// Components
import Gap from '../../components/gap/Gap';
import Upload from '../../components/Upload/Upload';

const Register = () => {
    const history = useHistory()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const submit = async (e) => {
        e.preventDefault()

        const data = new FormData();
        data.append('name',name)
        data.append('email',email)
        data.append('password',password)
        data.append('password_confirmation',password2)
        data.append('image',image)
    
        try {
            await axios.post(`http://localhost:5000/api/user/register`, data, {
                headers: {
                  'content-type': 'multipart/form-data' 
                }
            })
            
            Swal.fire({
                title: 'Sukses',
                text: 'Registrasi berhasil',
                icon: 'success',
            })
            history.push('/login')
        } catch (error) {
            console.log(error.message)
            Swal.fire({
                title: 'Error',
                text: 'Pastikan anda mengisi form dengan benar',
                icon: 'error',
            })
        }
    }

    const uploadImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
        setPreview(URL.createObjectURL(img))
    }

    return (
    <div style={{width: "70%"}}>
        <Gap height="50px"/>
        <Form onSubmit={(e) => submit(e)}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" value={name || ""} onChange={e => setName(e.target.value)} name="name" id="name" required/>
            </FormGroup>
            <Gap height="30px"/>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" value={email || ""} onChange={e => setEmail(e.target.value)} name="email" id="email" required/>
            </FormGroup>
            <Gap height="30px"/>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" value={password || ""} onChange={e => setPassword(e.target.value)} name="password" id="password" required/>
            </FormGroup>
            <Gap height="30px"/>
            <FormGroup>
                <Label for="password2">Password Confirmation</Label>
                <Input type="password" value={password2 || ""} onChange={e => setPassword2(e.target.value)} name="password2" id="password2" required/>
            </FormGroup>
            <Gap height="30px"/>
            <FormGroup>
                <Label for="photo">Photo</Label>
                <Upload img={preview} accept="image/*" onChange={(e) => uploadImage(e)} />
            </FormGroup>
            <Gap height="30px"/>
            <Button type="submit">Submit</Button>
        </Form>
    </div>
    )
}

export default Register
