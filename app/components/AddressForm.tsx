'use client';
import React from 'react';
import { useMediaQuery, Box, TextField } from '@mui/material';
import { getIn, FormikValues } from 'formik';
import styles from './AddressForm.module.css';

interface Props {
    type: string;
    values: FormikValues;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleBlur: (event: React.FocusEvent) => void;
    handleChange: (event: React.ChangeEvent) => void;
}

export default function AddressForm({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}: Props) {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const formattedName = (field: string): string => {
        return `${type}.${field}`;
    };

    const formattedError = (field: string): boolean => {
        return Boolean(getIn(touched, formattedName(field)) && getIn(errors, formattedName(field)));
    };

    const formattedHelper = (field: string): string | undefined => {
        return getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));
    };

    return (
        <Box className={styles.boxOne} sx={{ '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' } }}>
            <TextField
                fullWidth
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={formattedName('firstName')}
                error={formattedError('firstName')}
                helperText={formattedHelper('firstName')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name={formattedName('lastName')}
                error={formattedError('lastName')}
                helperText={formattedHelper('lastName')}
                sx={{ gridColumn: 'span 2' }}
            />

            <TextField
                fullWidth
                type="text"
                label="Street Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street1}
                name={formattedName('street1')}
                error={formattedError('street1')}
                helperText={formattedHelper('street1')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type="text"
                label="Street Address 2 (Optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street2}
                name={formattedName('street2')}
                error={formattedError('street2')}
                helperText={formattedHelper('street2')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name={formattedName('city')}
                error={formattedError('city')}
                helperText={formattedHelper('city')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name={formattedName('state')}
                error={formattedError('state')}
                helperText={formattedHelper('state')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type="text"
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name={formattedName("country")}
                error={formattedError("country")}
                helperText={formattedHelper("country")}
                sx={{ gridColumn: "span 4" }}
            />
            <TextField 
                fullWidth 
                type="text" 
                label="Zip Code"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name={formattedName("zipCode")}
                error={formattedError("zipCode")}
                helperText={formattedHelper("zipCode")}
                sx={{ gridColumn: "span 2" }}
            />
        </Box>
    )
}
