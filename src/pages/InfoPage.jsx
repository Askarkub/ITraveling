import { Container } from '@material-ui/core';
import React from 'react';
import RightSidebar from '../components/RightSidebar';
import Navbar from '../components/Navbar';

const InfoPage = () => {

    return (
        <div className="mainphoto">
            <Navbar />
            <Container>
                <h1 className="maintext">Путешествуй вместе с ITraveling</h1>
                <div className="main">
                    <div className="content">
                    </div>
                    <RightSidebar />
                </div>
            </Container>
        </div>
    );
};

export default InfoPage;
