'use client'

// REACT Imports
import React, { useState } from 'react'

// MUI Imports
import { Box, Divider, IconButton, Typography, InputBase } from "@mui/material";
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

// MISC Imports
import styles from "./Subscribe.module.css"

export default function Subscribe() {

  const [email, setEmail] = useState('')

  return (
    
    <Box className={styles.boxOne}>
        <IconButton>
            <MarkEmailReadOutlinedIcon/>
        </IconButton>
        <Typography variant="h3">Subscribe to our newsletter</Typography>
        <Typography>and recieve a $20 coupon for your first order when you checkout</Typography>
        <Box className={styles.boxTwo}>
            <InputBase className={styles.inputOne} placeholder='Enter email' value={email} onChange={(event) => setEmail(event.target.value)}/>
            <Divider className={styles.dividerOne} orientation='vertical'/>
            <Typography className={styles.typoThree} >Subscribe</Typography>
        </Box>
    </Box>
    
  );
};
