import React from "react";
import styled from 'styled-components';
import { DialogContent, DialogFooter, ConfirmButton } from "../FoodDialog/FoodDialog";
import { formatPrice } from "../Data/FoodData";
import { getPrice } from "../FoodDialog/FoodDialog";

const OrderStyled = styled.div`
    position: fixed;
    right: 0px;
    top: 46px;
    width: 340px;
    background-color: white;
    height: calc(100% - 47px);
    z-index: 10;
    box-shadow: 4px 0px 5px 5px grey;
    display: flex;
    flex-direction: column; 
`
const OrderContent = styled(DialogContent)`
    padding: 20px;
    height: 100%;
`;
const OrderContainer = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid grey;
        ${({editable}) => editable ? `
        &:hover {
            cursor: pointer;
            background-color: #e7e7e7
        }
      ` : 
      `pointer-events: none;`
      }
`;
const OrderItem = styled.div`
    padding: 10x 0px;
    display: grid;
    grid-template-columns: 20px 150px 20px 60px;
    justify-content: space-between;
`;
const DetalItems = styled.div`
    color: gray;
    font-size: 12px;
`;
export function Order({orders, setOrders, setOpenFood}){
    const subtotal = orders.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    const deleteItem = index => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    }


    return  <OrderStyled>                
                {orders.length === 0 ? (<OrderContent>Your order's looking pretty empty</OrderContent>
                ) : (
                    <OrderContent> 
                        {" "}
                        <OrderContainer> Your order: </OrderContainer> {" "}
                        {orders.map((order, index) => (
                            <OrderContainer editable>
                                <OrderItem
                                    onClick={() => {
                                        setOpenFood({...order, index});
                                    }}
                                >
                                    <div>{order.quantity}</div>
                                    <div>{order.name}</div>
                                    <div 
                                        style={{cursor: 'pointer'}} 
                                        onClick={e => {
                                            e.stopPropagation();
                                            deleteItem(index)}
                                    }>🗑️</div>
                                    <div>{formatPrice(getPrice(order))}</div>
                                </OrderItem>
                                <DetalItems>
                                    {order.toppings
                                        .filter(t => t.checked)
                                        .map(topping => topping.name)
                                        .join(",")
                                    }
                                </DetalItems>
                                {order.choices && <DetalItems>{order.choices}</DetalItems>}
                            </OrderContainer>
                        ))}
                        <OrderContainer>
                            <OrderItem>
                                <div/>
                                <div>Sub-Total</div>
                                <div>{formatPrice(subtotal)}</div>
                            </OrderItem>
                            <OrderItem>
                                <div/>
                                <div>Tax</div>
                                <div>{formatPrice(tax)}</div>
                            </OrderItem>
                            <OrderItem>
                                <div/>
                                <div>Total</div>
                                <div>{formatPrice(total)}</div>
                            </OrderItem>
                        </OrderContainer>
                    </OrderContent>
                )}  
                <DialogFooter>
                    <ConfirmButton>Checkout</ConfirmButton>
                </DialogFooter>                
            </OrderStyled>
}