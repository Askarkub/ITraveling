import { Container } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import RightSidebar from '../components/RightSidebar';
import Navbar from '../components/Navbar';
import { clientContext } from '../contexts/ClientContext';
import FullInfoCard from '../components/FullInfo';

const InfoPage = () => {
    const { places, getPlaces, currentPosts } = useContext(clientContext)
    useEffect(() => {
        getPlaces()
    }, [])


    return (
        <>
            {
                places ? (
                    <div>
                        <Navbar />
                        <Container>
                            <h1 className="maintext">Подробная информация</h1>
                            <div className="main">
                                <div className="content">
                                    {
                                        currentPosts.map(item => (
                                            <FullInfoCard item={item} key={item.id} />
                                        ))
                                    }
                                </div>
                                <RightSidebar />
                            </div>
                        </Container>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )

            }

        </>
    );
};

export default InfoPage;
