export type Funko ={
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Funko & {
    quantity: number
}

export type FunkoID = Funko['id']