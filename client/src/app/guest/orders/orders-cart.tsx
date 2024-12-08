"use client";
import { useGuestGetOrderListQuery } from "@/queries/useGuest";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { formatCurrency, getVietnameseOrderStatus } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import  socket  from "@/lib/socket";
import { UpdateOrderResType } from "@/schemaValidations/order.schema";

export default function OrdersCart() {
  const { data, refetch } = useGuestGetOrderListQuery();
  const orders = useMemo(() => data?.payload.data ?? [], [data]);
  const totalPrice = useMemo(() => {
    return orders.reduce((result, order) => {
      return result + order.dishSnapshot.price * order.quantity;
    }, 0);
  }, [orders])
  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }
    function onConnect() {
      console.log(socket.id)
    }
    function onDisconnect() {
      console.log('disconnect')
    }
    function onUpdateOrder(data: UpdateOrderResType['data']) {
        console.log(data)
      refetch()
    }
    socket.on('update-order', onUpdateOrder)
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('update-order', onUpdateOrder)
    }
  }, [refetch])

  return (
    <>
      {orders.map((order, index) => (
        <div key={order.id} className='flex gap-4 mb-4'>
          <div className='text-sm font-semibold'>{index + 1}</div>
          <div className='flex-shrink-0 relative'>
            <Image
              src={order.dishSnapshot.image}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className='object-cover w-[80px] h-[80px] rounded-md'
            />
          </div>
          <div className='space-y-1'>
            <h3 className='text-sm'>{order.dishSnapshot.name}</h3>
            <div className='text-xs font-semibold'>
              {formatCurrency(order.dishSnapshot.price)} x{' '}
              <Badge className='px-1'>{order.quantity}</Badge>
            </div>
          </div>
          <div className='flex-shrink-0 ml-auto flex justify-center items-center'>
            <Badge variant={'outline'}>
              {getVietnameseOrderStatus(order.status)}
            </Badge>
          </div>
        </div>
      ))}
      <div className='sticky bottom-0 '>
        <div className='w-full flex space-x-4 text-xl font-semibold'>
          <span>Tổng cộng · {orders.length} món</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </>
  )

}
