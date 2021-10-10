import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { clientContext } from '../contexts/ClientContext';


const places = [
    { name: 'Бишкек,пр. Манаса 40 ', desc: 'Тур Бурана', price: '4500' },
];
const addresses = [];
const payments = [
    { name: 'Тип карты', detail: 'Visa' },
    { name: 'Владелец карты', detail: 'Аскар Кубанычбеков' },
    { name: 'Номер карты', detail: 'xxxx-xxxx-xxxx-1234' },

];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Итоги заказа
            </Typography>
            <List disablePadding>
                {places.map((place) => (
                    <ListItem className={classes.listItem} key={place.name}>
                        <ListItemText primary={place.name} secondary={place.desc} />
                        <Typography variant="body2">{place.price} сом</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Итого" />
                    <Typography variant="subtitle1" className={classes.total}>
                        4500 сом
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Ф.И.О.
                    </Typography>
                    <Typography gutterBottom>Аскар Кубанычбеков</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Детали оплаты
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}