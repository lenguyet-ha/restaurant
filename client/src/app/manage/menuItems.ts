import { Home, LineChart, ShoppingCart, Users2, Salad, Table, Fish, Truck, Warehouse } from 'lucide-react'

const menuItems = [
  {
    title: 'Trang chủ',
    Icon: Home,
    href: '/'
  },
  {
    title: 'Đơn gọi  món',
    Icon: ShoppingCart,
    href: '/manage/orders'
  },
  {
    title: 'Bàn ăn',
    Icon: Table,
    href: '/manage/tables'
  },
  {
    title: 'Món ăn',
    Icon: Salad,
    href: '/manage/dishes'
  },

  {
    title: 'Báo cáo thống kê',
    Icon: LineChart,
    href: '/manage/dashboard'
  },
  {
    title: 'Nhân viên',
    Icon: Users2,
    href: '/manage/accounts'
  },
  {
    title: 'Nguyên liệu',
    Icon: Fish,
    href: '/'
  },
  {
    title: 'Nhà cung cấp',
    Icon: Truck,
    href: '/'
  },
    {
    title: 'Kho',
    Icon: Warehouse,
    href: '/'
  },
]

export default menuItems
