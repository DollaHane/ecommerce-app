'use client'
// REACT REDUX Imports
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// FIREBASE Imports
import { getDocs, collection } from "@firebase/firestore";
import { db } from '../GlobalComponents/Firebase';

// MUI Imports
import { IconButton, Box, Typography, useTheme } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Misc Imports
import { shades } from '../GlobalComponents/theme';
import { addToCart } from "../GlobalComponents/store";
import Link from 'next/link';
import styles from './Item.module.css'


interface ItemProps {
    item: {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
    };
    width: string | number;
}
    

export default function Item({ item, width }: ItemProps): JSX.Element {

    const dispatch = useDispatch();
    const usersCollectionRef = collection(db, "items");
    const cart = useSelector((state: {cart: {items: any[]}}) => state.cart.items);

    const [itemData, setItemData] = useState<{id: string}[]>([]);
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const { palette: { text } } = useTheme();

    
    useEffect(() => {
        const getItems = async () => {
          const data = await getDocs(usersCollectionRef);
          setItemData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getItems();
    }, []);


    return (
        <Box width={width}>
            <Box 
                position="relative" 
                onMouseOver={() => setIsHovered(true)} 
                onMouseOut={() => setIsHovered(false)}
            >
                <Link href={`/item/${item.id}`}>
                    <img className={styles.image} alt={item.name} src={item.image}/>
                </Link>

                <Box className={styles.boxOne} display={isHovered ? "block" : 'none'}>
                    <Box className={styles.boxTwo}>

                        {/* AMOUNT */}
                        <Box className={styles.boxThree} bgcolor={shades.neutral[100]}>
                            <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                                <RemoveIcon/>
                            </IconButton>

                            <Typography color={shades.primary[300]}>{count}</Typography>

                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddIcon/>
                            </IconButton>
                        </Box>

                        {/* BUTTON */}
                        { cart.some((cartItem: {id: string}) => cartItem.id === item.id) ? (
                            <button 
                            onClick={() => {dispatch(addToCart({ item: {...item, count} }))}}
                            className={styles.button}
                            >
                                <b>ADD TO CART</b>
                            </button>
                            
                        ) : (
                            <button className={styles.button}>
                                <b>IN CART</b>
                            </button>
                        )}

                    </Box>
                </Box>
            </Box>

            <Box mt="3px">
                <Typography variant="subtitle2" color={text.secondary}>
                    {item.category
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography fontWeight="bold">${item.price}</Typography>
            </Box>

        </Box>
    );
};
