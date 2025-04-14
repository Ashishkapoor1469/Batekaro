import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { CircleArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
  imageUrl?: string
  name: string
}

const Header = ({ imageUrl, name }: Props) => {
  return (
    <Card className="w-full flex rounded-lg items-center p-2 justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl || "/placeholder.svg"} />
          <AvatarFallback>{name ? name.substring(0, 1) : "?"}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{name || "Conversation"}</span>
      </div>
    </Card>
  )
}

export default Header
