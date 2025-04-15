"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
export const useNavigation = () => {
  const pathname = usePathname();
  const requestCount = useQuery(api.requests.count);
  const paths = useMemo(
    () => [
      {
        name: "Conversation",
        href: "/",
        icon: <IoChatboxOutline />,
        active: pathname.startsWith("/"),
      },
      {
        name: "Friends",
        href: "/Friends",
        icon: <FaUserFriends />,
        active: pathname === "/Friends",
        count: requestCount,
      },
    ],
    [pathname,requestCount]
  );
  return paths;
};
