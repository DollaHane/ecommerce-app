'use client';
// REACT Imports
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// MUI Imports
import { Box, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

// FIREBASE Imports
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../GlobalComponents/Firebase'

// Misc Imports
import styles from './Auth.module.css'

const FlexBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 30px 0;
`

export default function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (event: any) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    const [authUser, setAuthUser] = useState(false);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(true);
            } else {
                setAuthUser(false);
            }
        });

        return () => {
            listen();
        };
    }, []);

    
    return (
        <Box className={styles.boxone} display={!authUser ? "block" : "none"}>
            <Box className={styles.boxtwo}>
                <Box className={styles.boxthree}>

                    {/* HEADER */}
                    <FlexBox mb="15px">
                        <Typography variant="h3" className={styles.typoOne}>
                            Admin Login Page
                        </Typography>
                    </FlexBox>

                    {/* AUTH FORM */}
                    <FormControl className={styles.form}>
                        <TextField
                            className={styles.input}
                            value={email}
                            required={true}
                            onChange={(event) => setEmail(event.target.value)}
                            label="Email"
                            id="outlined-size-small"
                            size="small"
                        />

                        <TextField
                            className={styles.input}
                            value={password}
                            required={true}
                            onChange={(event) => setPassword(event.target.value)}
                            label="Password"
                            id="outlined-size-small"
                            size="small"
                        />
                        <button className={styles.button} onClick={signIn}>
                            <b>LOGIN</b>
                        </button>
                    </FormControl>
                    
                </Box>
            </Box>
        </Box>
    );
};