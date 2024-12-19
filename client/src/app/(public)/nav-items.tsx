"use client";
import { useAppContext } from "@/components/app-provider";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Role } from "@/constants/type";
import { cn, handleErrorApi } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { RoleType } from "@/types/jwt.types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems: {
  title: string;
  href: string;
  role?: RoleType[];
  hideWhenLogin?: boolean;
}[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Menu",
    href: "/guest/menu",
    role: [Role.Guest],
  },
  {
    title: "Đăng nhập",
    href: "/login",
    hideWhenLogin: true,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    role: [Role.Owner, Role.Employee],
  },
  {
    title: "Đơn gọi món",
    href: "orders",
    role: [Role.Guest],
  },
];

// Server: Món ăn, Đăng nhập. Do server không biết trạng thái đăng nhập của user
// CLient: Đầu tiên client sẽ hiển thị là Món ăn, Đăng nhập.
// Nhưng ngay sau đó thì client render ra là Món ăn, Đơn hàng, Quản lý do đã check được trạng thái đăng nhập

export default function NavItems({ className }: { className?: string }) {
  const { role, setRole, disconnectSocket } = useAppContext();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const logout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      setRole();
      disconnectSocket()
      router.push("/");
    } catch (error) {
      handleErrorApi({
        error,
      });
    }
  };
  return (
    <>
      {menuItems.map((item) => {
        // Trường hợp đăng nhập thì chỉ hiển thị menu đăng nhập
        const isAuth = item.role && role && item.role.includes(role);
        // Trường hợp menu item có thể hiển thị dù cho đã đăng nhập hay chưa
        const canShow =
          (item.role === undefined && !item.hideWhenLogin) ||
          (!role && item.hideWhenLogin);
        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {item.title}
            </Link>
          );
        }
        return null;
      })}
      {role !== Role.Guest && role && (
       <AlertDialog>
       <AlertDialogTrigger asChild>
         <div className={cn(className, 'cursor-pointer')}>Đăng xuất</div>
       </AlertDialogTrigger>
       <AlertDialogContent>
         <AlertDialogHeader>
           <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>
           <AlertDialogDescription>
             Việc đăng xuất có thể làm mất đi hóa đơn của bạn
           </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
           <AlertDialogCancel>Thoát</AlertDialogCancel>
           <AlertDialogAction onClick={logout}>OK</AlertDialogAction>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
      )}
      {role === Role.Guest && (
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={cn(className, 'cursor-pointer')}>Thoát</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có muốn thoát ra không?</AlertDialogTitle>
            <AlertDialogDescription>
              Việc thoát ra có thể làm mất đi hóa đơn của bạn
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Thoát</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )}
    </>
  );
}
