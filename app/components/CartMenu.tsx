'use client';
// MUI Imports
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from "../GlobalComponents/store";

// Misc Imports
import Link from 'next/link'
import { shades } from '../GlobalComponents/theme';
import styles from './CartMenu.module.css'

interface Item {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  count: number;
  image: string;
};

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function CartMenu() {

  const dispatch = useDispatch();
  const cart: Item[] = useSelector((state: any) => state.cart.cart);
  const isCartOpen = useSelector((state: any) => state.cart.isCartOpen);


  const totalPrice = cart.reduce((total: number, item: Item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Box className={styles.boxone} display={isCartOpen ? "block" : "none"}>
      <Box className={styles.boxtwo}>
        <Box className={styles.boxthree}>

          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">
              SHOPPING BAG ({cart.length})
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <CloseIcon/>
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item: Item) => (
              <Box key={`${item.name}-${item.id}`}>
                <FlexBox p="15px 0">

                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={item.image}>
                    </img>
                  </Box>

                  <Box flex="1 1 60%">

                    {/* ITEM NAME */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.name}
                      </Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({id: item.id}))}>
                        <CloseIcon/>
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.shortDescription}</Typography>

                    {/* AMOUNT */}
                    <FlexBox m="15px 0">
                      <Box display="flex" alignItems="center" border={`1.5px solid ${shades.neutral[500]}`}>
                        <IconButton onClick={() => dispatch(decreaseCount({id: item.id}))}>
                          <RemoveIcon/>
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton onClick={() => dispatch(increaseCount({id: item.id}))}>
                          <AddIcon/>
                        </IconButton>
                      </Box>

                      {/* PRICE */}
                      <Typography fontWeight="bold">${item.price}</Typography>
                    </FlexBox>

                  </Box>

                </FlexBox>
                <Divider/>
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">

            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>

            <Button className="checkoutbtn"
              onClick={() => dispatch(setIsCartOpen())}
            >
              <Link href="/checkout">CHECKOUT</Link>
            </Button>

          </Box>

        </Box>
      </Box>
    </Box>
  )
}