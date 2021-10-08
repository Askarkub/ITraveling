import axios from 'axios';
import React, { useReducer } from 'react';
import { API } from '../helpers/const';

export const adminContext = React.createContext()

const INIT_STATE = {
    places: null,
    placeToEdit: null,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PLACES":
            return { ...state, places: action.payload }
        case "GET_PLACE_TO_EDIT":
            return { ...state, placeToEdit: action.payload }
        default:
            return { ...state }
    }
}

const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const createPlace = async (newPlace) => {
        await axios.post(API, { ...newPlace, price: +newPlace.price })
        getPlaces()
    }

    const getPlaces = async () => {
        const { data } = await axios(API)
        dispatch({
            type: "GET_PLACES",
            payload: data
        })
    }

    const deletePlace = async (id) => {
        await axios.delete(`${API}/${id}`)
        getPlaces()
    }

    const getPlaceToEdit = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: "GET_PLACE_TO_EDIT",
            payload: data
        })
    }

    const getPlaceDetails = async (id) => {
        const { data } = await axios(`${API}/${id}`)
        dispatch({
            type: "GET_PLACE_DETAILS",
            payload: data
        })
    }

    const saveEditedPlace = async (editedPlace) => {
        await axios.patch(`${API}/${editedPlace.id}`, { ...editedPlace, price: +editedPlace.price })
        getPlaces()
    }

    return (
        <adminContext.Provider value={{
            places: state.places,
            placeToEdit: state.placeToEdit,
            createPlace,
            getPlaces,
            deletePlace,
            getPlaceToEdit,
            saveEditedPlace,
            getPlaceDetails
        }}>
            {children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;