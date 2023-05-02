'use client'
import React from 'react'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import AddressForm from './AddressForm'
import styles from './Shipping.module.css'

type Address = {
  
}

type ShippingProps = {
    values: {
      billingAddress: Address;
      shippingAddress: {
        isSameAddress: boolean;
        address: Address;
      };
    };
    errors: any;
    touched: any;
    handleBlur: any;
    handleChange: any;
    handleSubmit: any;
    setFieldValue: any;
  };
  
export default function Shipping({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: ShippingProps) {

  return (

    <Box className={styles.boxOne}>

      {/* BILLING FORM */}
      <Box>
        <Typography className={styles.typoOne}>
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box className={styles.boxTwo}>
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              checked={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  'shippingAddress.isSameAddress',
                  !values.shippingAddress.isSameAddress
                )
              }
            />
          }
        />
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <Box>
          <Typography className={styles.typoOne}>
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress.address}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};
