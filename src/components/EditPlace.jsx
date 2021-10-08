import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { adminContext } from '../contexts/AdminContext';
import { useHistory, useParams } from 'react-router';

const EditPlace = () => {
    const { getPlaceToEdit, placeToEdit, saveEditedPlace } = useContext(adminContext)
    const [editTravel, setEditTravel] = useState(placeToEdit)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        setEditTravel(placeToEdit)
    }, [placeToEdit])

    useEffect(() => {
        getPlaceToEdit(id)
    }, [])

    const handleInputs = (e) => {
        let obj = {
            ...editTravel,
            [e.target.name]: e.target.value
        }
        setEditTravel(obj)
    }
    return (
        <div className="add-place-input">
            {
                editTravel ? (
                    <div className="add-inputs">
                        <form>
                            <TextField value={editTravel.title} id="standard-basic" label="Название достропримечательности" name="title" onChange={handleInputs} />
                            <TextField value={editTravel.description} id="standard-basic" label="Описание" name="description" onChange={handleInputs} />
                            <TextField type="number" value={editTravel.price} id="standard-basic" label="Стоимость тура" name="price" onChange={handleInputs} />
                            <TextField value={editTravel.photo} id="standard-basic" label="Фото достопримечательности" name="photo" onChange={handleInputs} />
                            <TextField value={editTravel.location} id="standard-basic" label="Локация" name="location" onChange={handleInputs} />
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (
                                        !editTravel.title.trim() ||
                                        !editTravel.description.trim() ||
                                        // !editTravel.price.trim() ||
                                        !editTravel.photo.trim() ||
                                        !editTravel.location.trim()
                                    ) {
                                        alert("Заполните все поля")
                                        return
                                    }
                                    saveEditedPlace(editTravel)
                                    history.push('/admin')
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Сохранить изменения
                            </Button>
                        </form>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </div>

    );
};

export default EditPlace;