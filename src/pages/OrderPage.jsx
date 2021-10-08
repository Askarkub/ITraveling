import { Container } from '@material-ui/core';
import React from 'react';
import Checkout from '../components/CheckoutPage';
import Navbar from '../components/Navbar'


const OrderPage = () => {
    return (
        <>

            <Navbar />

            <Container>
                <div className="order">
                    <Checkout />
                </div>
            </Container>

        </>
    );
};

export default OrderPage;