"use client";
import { useAppContext } from "@/components/app-provider";
import { Role } from "@/constants/type";
import { cn, handleErrorApi } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { RoleType } from "@/types/jwt.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems: {
  title: string;
  href: string;
  role?: RoleType[];
  authRequired?: boolean;
  hideWhenLogin?: boolean;
}[] = [
  {
    title: "Món ăn",
    href: "/guest/menu", // authRequired = undefined nghĩa là đăng nhập hay chưa đều cho hiển thị
    role: [Role.Guest],
  },
  {
    title: "Trang chủ",
    href: "/"
  },
  {
    title: "Đăng nhập",
    href: "/login",
    hideWhenLogin: true, // Khi false nghĩa là chưa đăng nhập thì sẽ hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    role: [Role.Owner, Role.Employee], // true nghĩa là đăng nhập rồi mới hiển thị
  },
];

// Server: Món ăn, Đăng nhập. Do server không biết trạng thái đăng nhập của user
// CLient: Đầu tiên client sẽ hiển thị là Món ăn, Đăng nhập.
// Nhưng ngay sau đó thì client render ra là Món ăn, Đơn hàng, Quản lý do đã check được trạng thái đăng nhập
export default function NavItems({ className }: { className?: string }) {
  const { role, setRole } = useAppContext();
  const logoutMutation = useLogoutMutation()
  const router = useRouter()
  const logout = async () => {
  if(logoutMutation.isPending) return
  try {
    await logoutMutation.mutateAsync()
    setRole()
    router.push('/')
  } catch (error) {
    handleErrorApi({
      error
    })
    
  }
  }
  return (
    <div>
      {menuItems.map((item) => {
        // Trường hợp đăng nhập thì chỉ cần menu đăng nhập
        const isAuth = item.role && role && item.role.includes(role);
        // Trường hợp menu item có thể hiển thị dù đã đăng nhập hay chưa
        const canShow =
          (item.role === undefined && !item.hideWhenLogin) || (!role && item.hideWhenLogin);
        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {item.title}
            </Link>
          );
        }
        return null;
      })}
     { role && <div className={cn(className, 'cusor-pointer')} onClick={logout}>Đăng xuất</div>
     }
     </div>
  );
}
