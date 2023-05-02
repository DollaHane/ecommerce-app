'use client'
// REACT Imports
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

// MUI Imports
import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

// MISC Imports
import { shades } from '../GlobalComponents/theme'
import styles from "./MainCarousel.module.css"

// IMAGE Imports
import Image from 'next/image';
import image1 from '../assets/brooke-cagle-aVT8VkmzML4-unsplash.jpeg';
import image2 from '../assets/chris-ghinda-wK2ESlRRZQ8-unsplash.jpeg';
import image3 from '../assets/jc-gellidon-JM8TkWJ9UIY-unsplash.jpeg';
import image4 from '../assets/larm-rmah-R1Ku62Z7zqE-unsplash.jpeg';
import image5 from '../assets/toa-heftiba-dti56waifB4-unsplash.jpeg';


export default function MainCarousel() {

    const isNonMobile = useMediaQuery("min-width:600px")

    return (

        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton onClick={onClickHandler} className={styles.iconPrev}>
                    <NavigateBeforeIcon className={styles.icons}/>
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton onClick={onClickHandler} className={styles.iconNext}>
                    <NavigateNextIcon className={styles.icons}/>
                </IconButton>
            )}
        >
            <Box>
                <Image src={image1} alt="carousel-1" className={styles.images}/>
                <Box 
                    className={styles.boxTwo} 
                    left={isNonMobile ? "10%" : "0"} 
                    right={isNonMobile ? undefined : "0"}
                    margin={isNonMobile ? undefined : "0 auto"}
                    maxWidth={isNonMobile ? undefined : "340px"}
                >
                    <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
                    <Typography variant="h1">Summer Sale</Typography>
                    <Typography className={styles.typoThree} fontWeight="bold" color={shades.secondary[300]}>Discover More</Typography>
                </Box>
            </Box>

            <Box><Image src={image2} alt="carousel-2" className={styles.images}/></Box>
            <Box><Image src={image3} alt="carousel-3" className={styles.images}/></Box>
            <Box><Image src={image4} alt="carousel-4" className={styles.images}/></Box>
            <Box><Image src={image5} alt="carousel-5" className={styles.images}/></Box>
            
        </Carousel>
    );
};
