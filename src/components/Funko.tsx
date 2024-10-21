import type { Funko } from '../types'
import { CartActions } from '../reducers/cart-reducer'

type FunkoProps= {
    funko: Funko,
    dispatch: React.Dispatch<CartActions>
}

const Funko = ({funko, dispatch} : FunkoProps) => {
    const {name, image, description, price} = funko
    
    return (
        <div className="col-md-6 col-lg-4 my-4">
            <div className="img-div">
                <img className="img-funko" src={`/img/${image}.png`} alt="imagen funko" />
            </div>
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">$ {price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() => dispatch({type: "add-to-cart", payload: {
                    item: funko   
                }})}
            >Add to Cart</button>
        </div>
    );
}

export default Funko