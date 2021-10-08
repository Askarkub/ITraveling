import React, { useContext, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from 'react-router-dom'
import { clientContext } from '../contexts/ClientContext';
import { Button, makeStyles, Slider, Typography } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import SimpleAccordion from './Accordion';

const RightSidebar = () => {
    const [price, setPrice] = React.useState('');
    const [location, setLocation] = React.useState('');
    const history = useHistory()
    const { getPlaces, locations, getLocations } = useContext(clientContext)



    const filterPlaces = (key, value) => {
        let search = new URLSearchParams(history.location.search)
        search.set(key, value)
        let url = `${history.location.pathname}?${search.toString()}`
        history.push(url)
        setPrice(search.get("price_lte"))
        setLocation(search.get("location"))
        getPlaces()
    }



    let search = new URLSearchParams(history.location.search)
    useEffect(() => {
        setPrice(search.get("price_lte"));
        setLocation(search.get("location"))
        getLocations()
    }, [])



    const resetFilter = () => {
        setPrice('')
        setLocation('')
        history.push('/')
        getPlaces()
    }


    return (
        <div className='right-sidebar'>
            <FormControl component="fieldset">
                <FormLabel component="legend">Стоимость тура</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={price} onChange={(e) => filterPlaces('price_lte', e.target.value)}>
                    <FormControlLabel value="1000" control={<Radio />} label="1000" />
                    <FormControlLabel value="3000" control={<Radio />} label="3000" />
                    <FormControlLabel value="5000" control={<Radio />} label="5000" />
                    <FormControlLabel value="10000" control={<Radio />} label="10000" />
                </RadioGroup>
            </FormControl>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Туры</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={location} onChange={(e) => filterPlaces('location', e.target.value)}>
                        {
                            locations.map(item => (
                                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </div>
            <Button variant="contained" size="small" onClick={resetFilter}>Сбросить</Button>
            <div className>
                <SimpleAccordion />
            </div>


        </div>



    );
};

export default RightSidebar;

