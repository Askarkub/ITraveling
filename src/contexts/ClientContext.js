import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { calcSubPrice, calcTotalPrice } from '../helpers/calc';
import { API } from '../helpers/const';

export const clientContext = React.createContext()

const INIT_STATE = {
    places: null,
    placeCountFavorite: JSON.parse(localStorage.getItem("favorite")) ? JSON.parse(localStorage.getItem("favorite")).places.length : 0,
    favorite: null,
    locations: []
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_PLACES":
            return { ...state, places: action.payload }
        case "ADD_AND_DELETE_PLACE_IN_FAVORITE":
            return { ...state, placesCountInFavorite: action.payload }
        case "GET_FAVORITE":
            return { ...state, favorite: action.payload }
        case "GET_LOCATIONS":
            return { ...state, locations: action.payload }
        default:
            return { ...state }
    }
}

const ClientContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const getPlaces = async () => {
        const { data } = await axios(`${API}${window.location.search}`)
        dispatch({
            type: "GET_PLACES",
            payload: data
        })
    }

    const addAndDeletePlaceInFavorite = (place) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"))
        if (!favorite) {
            favorite = {
                places: [],
                totalPrice: 0,
            }
        }
        let newPlace = {
            place: place,
            count: 1,
            subPrice: 0
        }
        newPlace.subPrice = calcSubPrice(newPlace)
        let newFavorite = favorite.places.filter(item => item.place.id === place.id)
        if (newFavorite.length) {
            favorite.places = favorite.places.filter(item => item.place.id !== place.id)
        }
        else {
            favorite.places.push(newPlace)
        }
        favorite.totalPrice = calcTotalPrice(favorite.places)
        // console.log(favorite.totalPrice);
        localStorage.setItem("favorite", JSON.stringify(favorite))
        dispatch({
            type: "ADD_AND_DELETE_PLACE_IN_FAVORITE",
            payload: favorite.places.length
        })
    }

    /*********************************************************** */
    const checkPlaceInFavorite = (id) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        if (!favorite) {
            return false
        }
        let newFavorite = favorite.places.filter(item => item.place.id === id)
        return !newFavorite.length ? true : false;
    }

    /******************************************************* */

    const getFavorite = () => {
        let favorite = JSON.parse(localStorage.getItem("favorite"));
        dispatch({
            type: "GET_FAVORITE",
            payload: favorite
        })
    }

    /**************************************************** */

    const changeCountPlaces = (count, id) => {
        let favorite = JSON.parse(localStorage.getItem("favorite"))
        if (!favorite) {
            return
        }
        favorite.places = favorite.places.map(item => {
            if (item.place.id === id) {
                item.count = count
                item.subPrice = calcSubPrice(item)
            }
            return item
        })
        favorite.totalPrice = calcTotalPrice(favorite.places)
        localStorage.setItem("favorite", JSON.stringify(favorite))
        getFavorite()
    }

    /********************************************* */

    const getLocations = async () => {
        const { data } = await axios(API)
        // console.log(data);
        const arr = []
        data.forEach(item => {
            arr.push(item.location)
        })


        let newArr = []
        arr.forEach(elem => {
            let chech = newArr.filter(item => item.trim() === elem.trim())
            if (chech.length === 0) {
                newArr.push(elem)
            }
        })

        dispatch({
            type: "GET_LOCATIONS",
            payload: newArr
        })
    }


    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)

    useEffect(() => {
        const fetchPlaces = () => {
            const data = state.places || []
            setPosts(data)
        }
        fetchPlaces()
    }, [state.places])

    const indexOfLastPost = currentPage * postsPerPage
    const indexofFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost)
    const totalPosts = posts.length



    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }



    const createNewUser = async (newUser, history) => {
        try {
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/registration', newUser)

            history.push('/')
        }
        catch (e) {

            alert(e.response.data.message)
        }
    }


    const login = async (user, history) => {
        try {
            const data = await axios.post('https://intense-retreat-64750.herokuapp.com/auth/login', user)
            history.push('/')
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }



    return (
        <clientContext.Provider value={{
            places: state.places,
            placesCountInFavorite: state.placesCountInFavorite,
            favorite: state.favorite,
            locations: state.locations,
            currentPosts,
            postsPerPage,
            totalPosts,
            getPlaces,
            addAndDeletePlaceInFavorite,
            checkPlaceInFavorite,
            getFavorite,
            changeCountPlaces,
            getLocations,
            changePage,
            createNewUser,
            login
        }}>
            {children}

        </clientContext.Provider>
    );
};

export default ClientContextProvider;