'use client'
//REACT Imports
import React, { useState, useEffect } from 'react'

// FIREBASE Imports
import { collection, addDoc } from "@firebase/firestore";
import { db } from '../GlobalComponents/Firebase'
import { onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from '../GlobalComponents/Firebase'

// MUI Imports
import { Box, Typography } from "@mui/material"
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// MISC Imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './page.module.css'
import Auth from '../components/Auth'

export default function Admin() {

    const [name, setName] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [longDesc, setLongDesc] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [authUser, setAuthUser] = useState(false);
    
    const usersCollectionRef = collection(db, "items");

    const createItem = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      try {
        await addDoc(usersCollectionRef, { 
          name: name, 
          shortDescription: shortDesc, 
          longDescription: longDesc, 
          price: price,  
          image: image,
          category: category 
        });
        toast.success('Item created successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setName('');
        setShortDesc('');
        setLongDesc('');
        setPrice('');
        setImage('');
        setCategory('');
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Error adding document. Please try again later.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    };


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in");
          setAuthUser(true);
        } else {
          console.log("User is signed out");
          setAuthUser(false);
        }
      });
    
      return unsubscribe;
    }, []);

    const signOutUser = () => {
        signOut(auth)
          .then(() => {
            setAuthUser(false);
          })
          .catch((error) => {
            console.log(error);
          });
    };
      

  return (
    <Box className={styles.boxOne}>
        <ToastContainer />
        <Auth/>

        <Box className={styles.boxFour}>
            <Box>
                {authUser ? (
                <button onClick={signOutUser}>Sign Out</button>
                ) : (
                <p>You are not signed in</p>
                )}
            </Box>
        </Box>

        <Typography id="page-desc" className={styles.typoOne} variant='h3'>Add new items to the store.</Typography>
        <FormControl className={styles.form}>
            <Box className={styles.boxTwo}>

                <TextField
                    className={styles.input}
                    value={name}
                    required={true}
                    onChange={(event) => setName(event.target.value)}
                    label="Name"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    className={styles.input}
                    value={shortDesc}
                    required={true}
                    onChange={(event) => setShortDesc(event.target.value)}
                    label="Short Description"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    className={styles.input}
                    value={longDesc}
                    required={true}
                    onChange={(event) => setLongDesc(event.target.value)}
                    label="Long Description"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    className={styles.input}
                    value={price}
                    required={true}
                    onChange={(event) => setPrice(event.target.value)}
                    label="Price"
                    id="outlined-size-small"
                    size="small"
                />

                <TextField
                    className={styles.input}
                    value={image}
                    required={true}
                    onChange={(event) => setImage(event.target.value)}
                    label="Image URL"
                    id="outlined-size-small"
                    size="small"
                />

                <Box className={styles.boxThree}>
                    <Typography id="simple-select-label">Category</Typography>
                    <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={category}
                            required={true}
                            label="Category"
                            onChange={(event) => setCategory(event.target.value)}
                        >
                        <MenuItem className={styles.menu} value={"topRated"}>Top Rated</MenuItem>
                        <MenuItem className={styles.menu}value={"newArrivals"}>New Arrivals</MenuItem>
                        <MenuItem className={styles.menu} value={"bestSellers"}>Best Sellers</MenuItem>
                    </Select>
                </Box>
                
            </Box>

            <button 
                className={styles.button} 
                onClick={(event) => {createItem(event)}}>
                <b>ADD TO STORE</b>
            </button>

        </FormControl>
    </Box>
  )
}
