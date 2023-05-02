'use client'
// REACT REDUX Imports
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// COMPONENT Imports
import Shipping from '../components/Shipping'
import { Payment } from '../components/Payment'

// MUI Imports
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';

// FORM Imports
import { Formik } from 'formik';
import * as yup from 'yup';

// STYLE Imports
import { shades } from "../GlobalComponents/theme"
import styles from './page.module.css'


const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
    address: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    }
  },
  email: "",
  phoneNumber: ""
}


interface Address {
  firstName: string;
  lastName: string;
  country: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CheckoutData {
  billingAddress: Address;
  shippingAddress: {
    isSameAddress: boolean;
  } & Address;
  email: string;
  phoneNumber: string;
}


const checkOutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];


export default function Checkout() {

  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state: any) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep ===1;

  const handleFormSubmit = async (values: any, actions: any) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isShippingAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      })
    };

    if (isSecondStep) {
      makePayment(values)
    };
    actions.setTouched()
  };

  const makePayment = async (values: any) => {
    // Not applicable for mock application.
  }

  return (
    <Box className={styles.boxOne}>
      <Stepper className={styles.stepperOne} activeStep={activeStep}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkOutSchema[activeStep]}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => (

            <form onSubmit={handleSubmit}>

              {isFirstStep && (
                <Shipping 
                  values={values} 
                  errors={errors} 
                  touched={touched}
                  handleSubmit={handleSubmit} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                  setFieldValue={setFieldValue}
                />
              )}

              {isSecondStep && (
                <Payment 
                  values={values} 
                  errors={errors} 
                  touched={touched} 
                  handleBlur={handleBlur} 
                  handleChange={handleChange}
                />
              )}

              <Box className={styles.boxTwo}>

                {isSecondStep && (
                  <Button 
                    fullWidth 
                    color="primary" 
                    variant="contained" 
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius:0,
                      padding: "15px 40px"}}
                    onClick={() => setActiveStep(activeStep -1)}
                  >
                    Back
                  </Button>
                )}

                  <Button 
                    type='submit'
                    fullWidth 
                    color="primary" 
                    variant="contained" 
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: "none",
                      color: "white",
                      borderRadius:0,
                      padding: "15px 40px"}}
                    onClick={() => setActiveStep(activeStep -1)}
                  >
                    {isFirstStep ? "Next" : "Place Order"}
                  </Button>

              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}
