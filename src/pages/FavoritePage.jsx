import { Container } from '@material-ui/core';
import React from 'react';
import FavoriteTable from '../components/FavoriteTable';
import Navbar from '../components/Navbar'

const FavoritePage = () => {
    return (
        <>

            <Navbar />

            <Container>
                <div className="favorite">
                    <h3 className="favorite-title">Избранные</h3>
                    <FavoriteTable />
                </div>
            </Container>

        </>
    );
};

export default FavoritePage;