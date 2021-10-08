import { Container } from '@material-ui/core';
import React from 'react';
import Content from '../components/Content';
import RightSidebar from '../components/RightSidebar';
import Navbar from '../components/Navbar';

const MainPage = () => {
    return (
        <div>
            <Navbar />
            <Container>
                <h1 className="maintext">Путешествуй вместе с <span>IT</span>raveling</h1>
                <div className="main">
                    <Content />
                    <RightSidebar />
                </div>
            </Container>
        </div>
    );
};

export default MainPage;
