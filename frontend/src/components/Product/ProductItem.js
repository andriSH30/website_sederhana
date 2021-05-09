import React, {Fragment} from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col
} from 'reactstrap';

const ProductItem = (props) => {
    return (
        <Fragment>
            <Col md={3}>
                <Card>
                    <CardImg top width="100%" src={props.image} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{props.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">${props.price}</CardSubtitle>
                        <CardText>{props.description}</CardText>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default ProductItem
