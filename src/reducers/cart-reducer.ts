import type { Funko, FunkoID, CartItem } from "../types"
import { db } from "../data/db";

export type CartActions = 
    { type: 'add-to-cart', payload: { item: Funko } } |
    { type: 'remove-from-cart', payload: { id: FunkoID } } |
    { type: 'increase-quantity', payload: { id: FunkoID } } |
    { type: 'decrease-quantity', payload: { id: FunkoID } } |
    { type: 'clear-cart' }


export type CartState = {
    data: Funko[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart): []
}

export const initialState : CartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1


export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    
    if(action.type === 'add-to-cart'){
        console.log("From add-to-cart: ", action.payload)
        
        const itemExists = state.cart.find(funko => funko.id === action.payload.item.id )
        console.log(itemExists)
        let updatedCart: CartItem[] = []
        
        if(itemExists){
            updatedCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < MAX_ITEMS){
                        return{...item, quantity: item.quantity + 1}
                    }else {
                        return item
                    }
                }else{
                    return item
                }
            })

        }else{
            const newItem: CartItem = {...action.payload.item, quantity : 1}
            console.log("No existe agregando: ", newItem)
            updatedCart = [...state.cart, newItem]
        }

        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'remove-from-cart'){
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        console.log("From remove-from-cart")
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'increase-quantity'){
        console.log("From increase-quantity")
        const updatedCart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'decrease-quantity'){
        const updatedCart = state.cart.map(item =>{
            if(item.id=== action.payload.id && item.quantity > MIN_ITEMS){
            return {
                ...item,
                quantity: item.quantity - 1
            }
            }
            return item
        })
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'clear-cart'){
        console.log("Cleaning...")
        return{
            ...state,
            cart: []
        }
    }

    return state
}


