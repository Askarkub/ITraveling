import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Truncate from 'react-truncate';
import { clientContext } from '../contexts/ClientContext';
import { Link } from 'react-router-dom';
// import TextsmsIcon from '@material-ui/icons/Textsms';
// import SimpleAccordion from './Accordion';

const useStyles = makeStyles({
    root: {
        maxWidth: 280,
        margin: '10px',
        width: 270,
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: '10px',
    },
    media: {
        height: 150,
        backgroundSize: "cover",
        backgroundColor: "rgb(197, 199, 214)",
    },
});

export default function MediaCard({ item }) {
    const classes = useStyles();
    const { addAndDeletePlaceInFavorite, checkPlaceInFavorite } = useContext(clientContext)

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={item.photo}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Truncate lines={3} ellipsis={<span>... <a href={`/info/${item.id}`}>далее</a></span>}>
                            {item.description}
                        </Truncate>
                    </Typography>
                    <h3>Стоимость тура: {item.price} сом</h3>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    onClick={() => addAndDeletePlaceInFavorite(item)}
                    size="small"
                    color="primary"
                >
                    <FavoriteIcon
                        color={checkPlaceInFavorite(item.id) ? "primary" : "secondary"}
                    />
                </Button>
                <Link to={`/info/${item.id}`}>
                    <Button
                        size="small" color="primary">
                        Подробнее
                        {/* <TextsmsIcon /> */}
                    </Button>
                </Link>

            </CardActions>

        </Card>
    );
}

