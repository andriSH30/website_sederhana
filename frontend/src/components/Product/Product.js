import React, {useEffect, useState} from 'react';
import {Row} from 'reactstrap';
import axios from 'axios';

// Components
import ProductItem from './ProductItem';

const Product = () => {
    const [products, setProducts] = useState([])

    useEffect( () => {
        const load = async () => {
            try {
                let res = await axios.get(`http://localhost:5000/api/products`)
                
                setProducts(res.data)
            } catch (error) {
                console.log(error.status)
            }
        }
        load()
    }) 

    return (
        <Row>
            {products.map(product => {
                return <ProductItem key={product._id} title={product.name} description={product.description} image={product.image} price={product.price}/>
            })}
            
        </Row>        
    )
}

export default Product
