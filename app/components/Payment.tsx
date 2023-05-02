'use client'
import React, { FC } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import styles from './Payment.module.css';

interface PaymentProps {
  values: {
    email: string;
    phoneNumber: string;
  };
  errors: {
    email?: string;
    phoneNumber?: string;
  };
  touched: {
    email?: boolean;
    phoneNumber?: boolean;
  };
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Payment: FC<PaymentProps> = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}): JSX.Element => {

  return (

    <Box className={styles.boxOne}>

      <Typography className={styles.typoOne}>Contact Info</Typography>

      <TextField 
        fullWidth 
        type="text" 
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4", marginBottom: "15px"}}
      />

      <TextField 
        fullWidth 
        type="text" 
        label="Phone Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name="phoneNumber"
        error={!!touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
        sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />

    </Box>
  );
};
