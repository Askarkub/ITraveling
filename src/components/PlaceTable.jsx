import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { adminContext } from '../contexts/AdminContext'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function PlaceTable() {
    const classes = useStyles();
    const { places, getPlaces, deletePlace } = useContext(adminContext)
    useEffect(() => {
        getPlaces()
    }, [])
    return (
        <>
            <div className="place-table">
                {
                    places ? (
                        <TableContainer component={Paper} >
                            <Table className={classes.table} aria-label="caption table">
                                <caption>Избранное</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№</TableCell>
                                        <TableCell align="left">Название достопримечательности</TableCell>
                                        <TableCell align="left">Описание</TableCell>
                                        <TableCell align="left">Стоимость тура</TableCell>
                                        <TableCell align="left">Локация</TableCell>
                                        <TableCell align="left">Фото</TableCell>
                                        <TableCell align="left">Удалить</TableCell>
                                        <TableCell align="left">Редактировать</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {places.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="left">{row.price}</TableCell>
                                            <TableCell align="left">{row.location}</TableCell>
                                            <TableCell align="left">
                                                <img width="200" src={row.photo} alt="" />
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    onClick={() => deletePlace(row.id)}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    DEL
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link to={`/edit/${row.id}`}>
                                                    <Button variant="contained" color="primary">
                                                        EDIT
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <h2>Loading...</h2>
                    )
                }
            </div>
        </>
    );
}
