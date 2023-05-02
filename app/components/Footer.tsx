'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { shades } from '../GlobalComponents/theme'
import styles from "./Footer.module.css"

export default function Footer() {


  return (
    <Box className={styles.boxOne}>
      <Box className={styles.boxTwo}>

        <Box className={styles.boxThree}>
          <Typography variant='h4' className={styles.typoOne} color={shades.secondary[500]}>ECOMMERCE</Typography>
          <div className={styles.div}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies, purus 
            quis rutrum malesuada, tortor ex ullamcorper leo, quis volutpat velit ex at mauris. 
            Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia Curae; Vivamus non nibh et lectus bibendum dignissim. 
          </div>
        </Box>

        <Box>
          <Typography variant='h4' className={styles.typoOne}>About Us</Typography>
          <Typography className={styles.typoTwo}>Careers</Typography>
          <Typography className={styles.typoTwo}>Our Stores</Typography>
          <Typography className={styles.typoTwo}>Terms & Conditions</Typography>
          <Typography className={styles.typoTwo}>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant='h4' className={styles.typoOne}>Customer Care</Typography>
          <Typography className={styles.typoTwo}>Help Center</Typography>
          <Typography className={styles.typoTwo}>Track Your Order</Typography>
          <Typography className={styles.typoTwo}>Corperate & Bulk Purchasing</Typography>
          <Typography className={styles.typoTwo}>Returns & Refunds</Typography>
        </Box>

        <Box className={styles.boxFour}>
          <Typography variant='h4' className={styles.typoOne}>Contact Us</Typography>
          <Typography className={styles.typoTwo}>76 Oceanview Avenue, Seaside Heights, FL 33139</Typography>
          <Typography className={styles.typoTwo}>Email: customercare@ecommerce.com</Typography>
          <Typography className={styles.typoTwo}>Phone: (555) 867-5309</Typography>
        </Box>

      </Box>
    </Box>
  );
};
