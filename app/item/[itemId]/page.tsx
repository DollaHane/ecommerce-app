'use client'
// REACT REDUX Imports
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";

// FIREBASE Imports
import { getDoc, collection, doc } from "@firebase/firestore";
import { db } from '../../GlobalComponents/Firebase'

// MUI Imports
import { IconButton, Box, Typography, Tabs, Tab } from "@mui/material"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Misc Imports
import { shades } from '../../GlobalComponents/theme';
import { addToCart } from "../../GlobalComponents/store";
//import Item from '../../components/Item'
import styles from './page.module.css'

type Params = {
  params: {
    itemId: string
  };
};

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  longDescription: string;
  category: string;
};

interface ItemData extends Omit<Item, 'id'> {};

export default function ItemDetails({ params: { itemId }}: Params) {

  const dispatch = useDispatch();
  const [value, setValue] = useState("description")
  const [count, setCount] = useState(1)
  const [item, setItem] = useState<Item>({ 
    id: '',
    name: '', 
    price: 0, 
    image: '', 
    longDescription: '', 
    category: '' 
  });

  const userCollectionRef = collection(db, "items");

  const handleChange = (newValue: any) => {
    setValue(newValue)
  };

  async function getItemData(itemId: string): Promise<ItemData> {
    const itemRef = doc(userCollectionRef, itemId);
    const itemSnapshot = await getDoc(itemRef);
    const data = itemSnapshot.data() as ItemData;
    return data;
  };

  useEffect(() => {
    const getItemDetails = async () => {
      const itemData = await getItemData(itemId);
      if (itemData) {
        const item: Item = {
          id: itemId,
          ...itemData
        };
        setItem(item);
      };
    };
    getItemDetails();
  }, [itemId]);


  return (
    <Box className={styles.boxOne}>
      <Box className={styles.boxTwo}>

        {/* IMAGES */}
        <Box className={styles.boxThree}>
          <img className={styles.imgOne} alt={item?.name} src={item?.image}></img>
        </Box>

        {/* ACTIONS */}
        <Box className={styles.boxFour}>

          <Box className={styles.boxFive}>
            <Box>Home / Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box className={styles.boxSix}>
            <Typography variant="h3">{item?.name}</Typography>
            <Typography className={styles.typoOne}>Price: ${item?.price}</Typography>
            <Typography className={styles.typoTwo}>{item?.longDescription}</Typography>
          </Box>

          <Box className={styles.boxSeven}>
            <Box className={styles.boxEight} border={`1.5px solid ${shades.neutral[300]}`}>

              <IconButton onClick={() => setCount(Math.max(count -1, 1))}>
                  <RemoveIcon/>
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon/>
              </IconButton>

            </Box>

            <button 
                onClick={() => {dispatch(addToCart({ item: {...item, count} }))}}
                className={styles.button}
            ><b>ADD TO CART</b>
            </button>

          </Box>

          <Box>
            <Box className={styles.boxNine}>
              <FavoriteBorderOutlinedIcon/>
              <Typography className={styles.typoThree}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.category} </Typography>
          </Box>

        </Box>

      </Box>

      {/* INFORMATION */}
      <Box className={styles.boxTen}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description"/>
          <Tab label="REVIEWS" value="reviews"/>
        </Tabs>
      </Box>

      <Box className={styles.boxElev}>
        {value === 'description' && (
          <div>{item.longDescription}</div>
        )}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

    </Box>
  );
};

/*

 RELATED ITEMS
<Box className={styles.boxTwel}>
<Typography variant="h3" fontWeight="bold">Related Products</Typography>
<Box className={styles.boxThir}>
  {items.slice(0,4).map((item, index) =>(
    <Item key={`${item.name}-${index}`} item={item}/>
  ))}
</Box>
</Box>

*/