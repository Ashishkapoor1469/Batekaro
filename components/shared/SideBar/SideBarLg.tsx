"use client"
import Link from "next/link"
import { SignedIn,SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeController";
import { useNavigation } from "@/hooks/useNavigation";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SideBarLg() {
    const paths = useNavigation();
    return(
        <>
        <SignedIn>
        <main className="min-h-screen p-4 lg:block hidden">
      <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
<nav>  
    <ul className="flex flex-col items-center gap-4">
       {paths.map((path,id)=>{
        return<li key={id} className="relative">
            <Link href={path.href}>
            <Tooltip>
                <TooltipTrigger>
                <Button   size="icon" variant={path.active ? "default" : "ghost"} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 duration-500">
                    {path.icon}

                </Button>
                {path.count ? <Badge className="absolute left-6 bottom-7 px-2">{path.count}</Badge>:null}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{path.name}</p>
                </TooltipContent>
                </Tooltip>
            </Link>
        </li>
       })}
       
</ul> 
</nav>
<div className="flex flex-col items-center gap-4 ">
    <ModeToggle/>
<UserButton/>
</div>
      </Card>
     </main></SignedIn>
     <SignedOut>
        <>
        </>
     </SignedOut>
        </>
    )
}