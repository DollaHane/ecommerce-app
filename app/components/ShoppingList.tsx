'use client'
// REACT / REDUX Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../GlobalComponents/store';

// FIREBASE Imports
import { getDocs, collection } from "@firebase/firestore";
import { db } from '../GlobalComponents/Firebase';

// MUI Imports
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';

// MISC Imports
import Item from './Item';


interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
};


export default function ShoppingList(): JSX.Element {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("all");
  const items: Item[] = useSelector((state: any) => state.cart.items);
  const isNonMobile = useMediaQuery("min-width:600px")

  console.log('items', items);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const usersCollectionRef = collection(db, "items");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(usersCollectionRef);
      dispatch(setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    };
    
    getItems();
  }, []); 

  const topRatedItems = items.filter(
    (item: Item) => item.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item: Item) => item.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item: Item) => item.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs 
        textColor='primary' 
        indicatorColor='primary' 
        value={value} 
        onChange={handleChange} 
        centered 
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : 'none' } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer" : {
            flexWrap: "wrap"
          }
        }}
      >
        <Tab label="ALL" value="all"/>
        <Tab label="NEW ARRIVALS" value="newArrivals"/>
        <Tab label="BEST SELLERS" value="bestSellers"/>
        <Tab label="TOP RATED" value="topRated"/>
      </Tabs>
      <Box
        margin="0 auto" 
        display="grid" 
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" && items.map((item: Item) => (
          <Item item={item} width="100%" key={`${item.name}-${item.id}`}/>
        ))}
        {value === "newArrivals" && newArrivalsItems.map((item: Item) => (
          <Item item={item} width="100%" key={`${item.name}-${item.id}`}/>
        ))}
        {value === "bestSellers" && bestSellersItems.map((item: Item) => (
          <Item item={item} width="100%" key={`${item.name}-${item.id}`}/>
        ))}
        {value === "topRated" && topRatedItems.map((item: Item) => (
                <Item item={item} width="100%" key={`${item.name}-${item.id}`}/>
            ))}
        </Box>
    </Box>
  );
};
