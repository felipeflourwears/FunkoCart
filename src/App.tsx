import { useReducer, useEffect } from "react";
import Header from "./components/Header"
import Funko from "./components/Funko"
import { cartReducer, initialState } from "./reducers/cart-reducer";

//Extension React Developer Tools

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(()=>{
      //No almacena objetos, ni arreglos, solo strings
      localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  
  return (
    <>
      <Header 
        cart={state.cart}
        dispatch={dispatch}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Our Collection</h2>

          <div className="row mt-5">
              {state.data.map((funko)=>{
                return(
                <Funko
                  key={funko.id}
                  funko={funko}
                  dispatch={dispatch}
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
