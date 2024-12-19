import OrdersCart from "./orders-cart";


export default function OrdersPage(){
    return(
        <div className='max-w[400px mx-auto space-y-4'>
        <h1 className='text-center text-xl font-bold'> 🍕 Đơn gọi món
        <OrdersCart/>
        </h1>
        </div>
    )
}


