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
import { AdminContext } from '../contexts/AdminContext'
import { Link } from 'react-router-dom';
import { clientContext } from '../contexts/ClientContext';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function FavoriteTable() {
    const classes = useStyles();
    const { favorite, getFavorite, changeCountPlaces, addAndDeletePlaceInFavorite } = useContext(clientContext)

    useEffect(() => {
        getFavorite()
    }, [])

    function handleChange(id, count) {
        if (count < 0) {
            return
        }
        changeCountPlaces(count, id)
    }


    return (
        <>
            {
                favorite ? (
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="caption table">
                            <caption> <h2 className="total-price">Итого: 4500 сом</h2> </caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="left">Название</TableCell>
                                    <TableCell align="left">Стоимость тура</TableCell>
                                    <TableCell align="left">Фото</TableCell>
                                    <TableCell align="left">Количество человек</TableCell>
                                    <TableCell align="left">Общая сумма</TableCell>
                                    <TableCell align="left">Удалить</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {favorite.places.map((row, index) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">{row.place.title}</TableCell>
                                        <TableCell align="left">{row.place.price}</TableCell>
                                        <TableCell align="left">
                                            <img width="200" src={row.place.photo} alt="" />
                                        </TableCell>
                                        <TableCell align="left">
                                            <input
                                                type="number"
                                                value={row.count}
                                                onChange={(e) => handleChange(row.place.id, e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row.subPrice}</TableCell>
                                        <TableCell align="left">
                                            <Button variant="contained" size="small" color="primary">Del</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table>
                            <Link to="/order">
                                <Button variant="contained" color="primary"  >Оформить заказ</Button>
                            </Link>
                        </Table>
                    </TableContainer>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </>
    );
}
