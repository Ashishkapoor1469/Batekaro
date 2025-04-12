import Link from "next/link"
import { UserButton,SignedIn,SignedOut } from "@clerk/nextjs";
import { IoChatbox } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
export default function SideBarLg() {
    return(
        <>
        <SignedIn>
        <main className=" hidden lg:flex m-4 mb-8 w-16 bg-gray-400 border rounded-sm shadow-sm flex-col items-center justify-between py-6">
<div className="flex flex-col gap-4 items-center">
<Link href="/"><IoChatbox className=" text-2xl text-gray-300 hover:bg-blue-700 h-10 w-12 rounded p-1 duration-500"/></Link>
<Link href="/Friends"><FaUserFriends className=" text-2xl text-gray-300 hover:bg-blue-700 h-10 w-12 rounded p-1.5 duration-500"/></Link>
</div>
<div className="flex flex-col gap-4 items-center">
<Link href="/">fr</Link> 
<UserButton/>
</div>
        </main>
        </SignedIn>
        <SignedOut>
            <></>
        </SignedOut>
        </>
    )
}