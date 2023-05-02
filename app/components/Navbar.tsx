'use client';
import React from 'react'

// MUI Imports
import { Badge, Box, IconButton } from '@mui/material'
import PersonOutline from '@mui/icons-material/PersonOutline'
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined'
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../GlobalComponents/store';

// Misc Imports
import Link from 'next/link'
import styles from './Navbar.module.css'
import { shades } from '../GlobalComponents/theme'

export default function Navbar() {

  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.cart)

  return (
    
    <Box className={styles.box}>
        <Box className={styles.innerbox}>

            <Box color={shades.secondary[500]}>
                <Link href="/" className={styles.linkhome}>ECOMMERCE</Link>
            </Box>
            
            <Box className={styles.boxicons} >
              <IconButton sx={{ color: "black" }}><SearchOutlined/></IconButton>
              
              <Link href="/admin">
                <IconButton sx={{ color: "black" }}><PersonOutline/></IconButton>
              </Link>
              
              <Badge 
                badgeContent={cart.length}
                color="secondary"
                invisible={cart.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 4px",
                    height: "14px",
                    minWidth: "13px"
                  }
                }}
                >

                <IconButton 
                  onClick={() => dispatch(setIsCartOpen())}
                  sx={{ color: "black" }}>
                  <ShoppingBagOutlined/>
                </IconButton>

              </Badge>

              <IconButton sx={{ color: "black" }}><MenuBookOutlined/></IconButton>

            </Box>
        </Box>
    </Box>
  );
};
