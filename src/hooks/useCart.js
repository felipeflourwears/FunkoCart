import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db";


const useCart = () => {
    
    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart): []
    }
    
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1
    
    useEffect(()=>{
        //No almacena objetos, ni arreglos, solo strings
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
      
    const addToCart = (item) => {
        const itemExists = cart.findIndex(funko=> funko.id === item.id )
        if(itemExists>=0){
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity += 1
            setCart(updatedCart)
            console.log("Ya existen: ", updatedCart[itemExists].quantity)
        }else{
            console.log("No existe agregando: ", item.quantity)
            item.quantity = 1
            setCart((prevState)=>[...prevState, item])
        }
    }
    
    const removeFromCart = (id) => {
        console.log("Eliminando...", id)
        setCart(prevCart => prevCart.filter(funko => funko.id !==id))
    }
     
    const increaseQuantity = (id) => {
        console.log("Incrementanoo....", id)
        const updatedCart = cart.map( item =>{
            if(item.id === id && item.quantity < MAX_ITEMS){
            return {
                ...item,
                quantity: item.quantity + 1
            }
            }
            return item
        })
        setCart(updatedCart)
    }
    
    const decreaseQuantity = (id) => {
        console.log("Decrementando...", id)
        const updatedCart = cart.map(item =>{
            if(item.id=== id && item.quantity > MIN_ITEMS){
            return {
                ...item,
                quantity: item.quantity - 1
            }
            }
            return item
        })
        setCart(updatedCart)
    }
    
    const clearCart = () => {
        console.log("Limpiando...")
        setCart([])
    }

    //const isEmpty = () => cart.length === 0; se manda a llamar como isEmpty()
    //const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)

    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}

export default useCart