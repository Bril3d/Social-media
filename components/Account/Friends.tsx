import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Friend {
  id: number;
  name: string;
  avatar: string;
}

const friendsList: Friend[] = [
  { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Diana Prince", avatar: "/placeholder.svg?height=50&width=50" },
]

export default function Friends() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Friends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {friendsList.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{friend.name}</span>
              </div>
              <Button variant="outline">Message</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}