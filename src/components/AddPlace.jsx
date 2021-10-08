import { TextField, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { adminContext } from '../contexts/AdminContext';

const AddPlace = () => {
    const [travel, setTravel] = useState({
        title: "",
        description: "",
        price: "",
        photo: "",
        location: ""
    })
    const { createPlace } = useContext(adminContext)

    function handleInputs(e) {
        let newPlace = {
            ...travel,
            [e.target.name]: e.target.value
        }
        setTravel(newPlace)
    }
    return (
        <div className="add-place-input">
            <div className="add-inputs">
                <form>
                    <TextField value={travel.title} id="standard-basic" label="Название достопримечательности" name="title" onChange={handleInputs} />
                    <TextField value={travel.description} id="standard-basic" label="Описание" name="description" onChange={handleInputs} />
                    <TextField type="number" value={travel.price} id="standard-basic" label="Стоимость тура" name="price" onChange={handleInputs} />
                    <TextField value={travel.photo} id="standard-basic" label="Фото достопримечательности" name="photo" onChange={handleInputs} />
                    <TextField value={travel.location} id="standard-basic" label="Локация" name="location" onChange={handleInputs} />
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            if (
                                !travel.title.trim() ||
                                !travel.description.trim() ||
                                !travel.price.trim() ||
                                !travel.photo.trim() ||
                                !travel.location.trim()) {
                                alert("Заполните все поля")
                                return
                            }
                            createPlace({
                                title: travel.title.trim(),
                                description: travel.description.trim(),
                                price: travel.price.trim(),
                                photo: travel.photo.trim(),
                                location: travel.location.trim()

                            }); alert("Новый тур добавлен!")
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Создать
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddPlace;