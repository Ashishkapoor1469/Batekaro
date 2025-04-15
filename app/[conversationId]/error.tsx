"use client"

import ConverstaionFallback from "@/components/shared/converstaion/ConverstaionFallback";
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Error({error}:{error:Error}){
const router = useRouter()

useEffect(() => {
  return () => {
    router.push("/")
  };
}, [error,router]);
return <ConverstaionFallback/>
}