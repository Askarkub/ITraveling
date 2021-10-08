import React from 'react';
import AddPlace from '../components/AddPlace';
import Navbar from '../components/Navbar';
import PlaceTable from '../components/PlaceTable'

const AdminPage = () => {
    return (
        <div>
            <Navbar />
            <AddPlace />
            <PlaceTable />
        </div>
    );
};

export default AdminPage;