import { useState, useEffect } from "react"
import Header from "./components/Header"
import Funko from "./components/Funko"
import { db } from "./data/db";

//Extension React Developer Tools

function App() {

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

  


  

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Our Collection</h2>

          <div className="row mt-5">
              {data.map((funko)=>{
                return(
                <Funko
                  key={funko.id}
                  funko={funko}
                  setCart={setCart}
                  addToCart={addToCart}
                />
                )
              })}
          </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">FunkoShopFlourwears - All Right Reserved</p>
          </div>
      </footer>
    </>
  )
}

export default App
