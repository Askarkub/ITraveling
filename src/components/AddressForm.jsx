import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Адрес доставки
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name"
                        name="firstName"
                        label="Ф.И.О."
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Адрес"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Номер телефона"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Использовать этот адрес для оплаты платежа"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}