// import { toggleSearch } from "@/features/slice/eventSlice";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, LogOut, Search, Wallet, ShoppingCart, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormatToIDR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/repositories/api";
import { useContext } from "react";
import { AuthContext } from "@/components/auth/AuthContext";

const UserProfile = () => {
  const { userId, logout } = useContext(AuthContext);
  const { data: user, isFetched } = useQuery(
    ["user-profile"],
    async () => {
      const res = await getAPI(`user/${userId}`);
      return res.data;
    }
    // { refetchInterval: 5000 }
  );
  return (
    isFetched && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="ring-2 ring-red-500">
            <AvatarImage className="object-cover" src={user.image_url ? user.image_url : ""} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="">
            <div className="flex gap-2 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image_url ? user.image_url : ""} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p>{user.fullname}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 items-center">
            <Link to={`/profile`} className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Link to={`/dashboard`} className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Wallet className="w-4 h-4" />
            <span>{FormatToIDR(10)}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 items-center mt-2">
            <LogOut className="w-4 h-4 " />
            <span onClick={logout}>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    localStorage.setItem("mode", mode);
  }, [darkMode]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    document.documentElement.classList.add(mode);

    return () => {
      document.documentElement.classList.remove(mode);
    };
  }, [darkMode]);
  return (
    <nav className="z-20 w-full flex items-center dark:bg-background dark:border-b dark:border-border justify-between  gap-4 px-6 sm:px-10 py-2 shadow-sm fixed top-0 left-0 bg-white">
      <div className="flex gap-8 items-center">
        <Link
          className="text-xl text-red-500 font-bold leading-4 hidden md:block text-primary dark:text-foreground"
          to="/"
        >
          Poscash
        </Link>
        <div className="flex cursor-pointer bg-background border-slate-500 dark:border-border backdrop-blur-sm w-[350px] gap-2 rounded-xl items-center border p-1">
          <Search size={20} className="ml-2 text-slate dark:text-foreground" />
          <Input className="px-2 py-1 dark:text-foreground w-full border-none outline-none focus:outline-none" />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Link to={`/${isLogin ? "cart" : "login"}`} className="flex items-center backdrop-blur-sm gap-4 px-4 py-2 ">
          <ShoppingCart size={20} />
        </Link>
        <div className={`${isLogin && "p-1 rounded-md w-12 h-12 ml-8"}`}>
          {isLogin ? (
            <UserProfile />
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="w-24 text-center text-white p-2 px-4 bg-red-500 hover:bg-red-400 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-24 text-center text-white p-2 px-4 bg-red-500 hover:bg-red-400 rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="theme-mode" checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
