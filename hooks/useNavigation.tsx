"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
export const useNavigation = () => {
  const pathname = usePathname();
  const paths = useMemo(
    () => [
      {
        name: "dashboard",
        href: "/",
        icon: <IoChatboxOutline />,
        active: pathname === "/",
      },
      {
        name: "Friends",
        href: "/Friends",
        icon: <FaUserFriends />,
        active: pathname === "/Friends",
      },
    ],
    [pathname]
  );
  return paths;
};
