"use client";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeController";
import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useConvresation } from "@/hooks/useConversation";

export default function MoboNav() {
  const paths = useNavigation();
  const { isActive } = useConvresation();
  if (isActive) return null;
  
  return (
    <>
      <SignedIn>
        <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
          <nav className="w-full h-full">
            <ul className="flex h-full w-full justify-evenly items-center">
              {paths.map((path, id) => {
                return (
                  <li key={id} className="relative">
                    <Link href={path.href}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            size="icon"
                            variant={path.active ? "default" : "ghost"}
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 duration-500"
                          >
                            {path.icon}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{path.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  </li>
                );
              })}
              <li>
                {" "}
                <ModeToggle />
              </li>
              <li>
                <UserButton />
              </li>
            </ul>
          </nav>
        </Card>
      </SignedIn>
      <SignedOut>
        <></>
      </SignedOut>
    </>
  );
}
