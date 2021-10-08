import React, { useContext, useEffect } from 'react';
import { clientContext } from '../contexts/ClientContext';
import MediaCard from './Card';
import Pagination from './Pagination';

const Content = () => {
    const { places, getPlaces, currentPosts } = useContext(clientContext)
    useEffect(() => {
        getPlaces()
    }, [])
    return (
        <>
            {
                places ? (
                    <div className="content">
                        <div className="content-block">
                            {
                                currentPosts.map(item => (
                                    <MediaCard item={item} key={item.id} />
                                ))
                            }
                        </div>

                        <Pagination />
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </>
    );
};

export default Content;