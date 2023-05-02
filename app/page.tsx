'use client'
import React from 'react'

// COMPONENT Imports
import MainCarousel from './components/MainCarousel'
import ShoppingList from './components/ShoppingList'
import Subscribe from './components/Subscribe'

// MISC Imports
import Link from 'next/link'
import styles from './page.module.css'


export default function Home() {
  return (
    <div className={styles.home}>
        <MainCarousel/>
        <ShoppingList/>
        <Subscribe/>
    </div>
  );
};
