import SearchInput from "@/components/header/SearchInput";
import { Switch } from "@/components/ui/switch";
import { LogOut, ShoppingCart, UserCircle, Newspaper, BarChart2, History, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { showCart, toggleShowCart, totalCart } from "@/features/globalReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { random } from "@/features/globalReducer";

const UserProfile = () => {
  const { userId, logout, isAdmin } = useContext(AuthContext);
  const rand = useSelector(random);

  const {
    data: user,
    isFetched,
    refetch,
  } = useQuery(["user-profile"], async () => {
    const res = await getAPI(`user/${userId}`);
    return res.data;
  });

  useEffect(() => {
    refetch();
  }, [refetch, rand]);

  return (
    isFetched && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="ring-2 ring-red-500">
            <AvatarImage className="object-cover" src={user.image_url} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="">
            <div className="flex gap-2 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image_url} />
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
            <Link to={`/dashboard/profile`} className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          {isAdmin && (
            <div>
              <DropdownMenuItem className="flex gap-2 items-center">
                <Link to={`/dashboard/cashier`} className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Cashier</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 items-center">
                <Link to={`/dashboard/sales`} className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Sales</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 items-center">
                <Link to={`/dashboard/report`} className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  <span>Report</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2 items-center">
                <Link to={`/dashboard/history`} className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  <span>History</span>
                </Link>
              </DropdownMenuItem>
            </div>
          )}

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
  const dispathc = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const { isLogin } = useContext(AuthContext);
  const show = useSelector(showCart);
  const total = useSelector(totalCart);

  useEffect(() => {
    const mode = darkMode ? "dark" : "light";
    localStorage.setItem("mode", mode);
  }, [darkMode, total]);

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    document.documentElement.classList.add(mode);

    return () => {
      document.documentElement.classList.remove(mode);
    };
  }, [darkMode, total]);

  return (
    <nav className="z-20 w-full h-full flex items-center dark:bg-background dark:border-b dark:border-border justify-between gap-4 px-6 sm:px-10 py-2 shadow-sm top-0 left-0 bg-white">
      <div className="flex gap-8 items-center">
        <Link
          className="text-xl text-red-500 font-bold leading-4 hidden md:block text-primary dark:text-foreground"
          to="/"
        >
          Poscash
        </Link>
        <SearchInput />
      </div>

      <div className="flex gap-4 items-center">
        {isLogin && (
          <div className="flex relative">
            <ShoppingCart
              className="cursor-pointer"
              size={32}
              onClick={() => {
                dispathc(toggleShowCart(!show));
              }}
            />
            <span className="absolute left-6 bottom-4  bg-red-500 rounded-full font-bold text-sm text-white ring-white px-2 border border-white">
              {total}
            </span>
          </div>
        )}
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
                to="/register-cashier"
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
