import { useParams } from "next/navigation"
import { useMemo } from "react";

export const useConvresation = () => {
    const params = useParams();
    const app = useMemo(()=> params?.app || ("" as string),[params.app])
    const isActive = useMemo(()=> !!app,[app])
    return{
        isActive,
        app
    }
}