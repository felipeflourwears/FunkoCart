
import Header from "./components/Header"
import Funko from "./components/Funko"
import useCart from "./hooks/useCart";

//Extension React Developer Tools

function App() {

  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal} = useCart()

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Our Collection</h2>

          <div className="row mt-5">
              {data.map((funko)=>{
                return(
                <Funko
                  key={funko.id}
                  funko={funko}
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
