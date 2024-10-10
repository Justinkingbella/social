
import {  useFollowUser } from "@/lib/react-query/queriesAndMutation";
import {  checkIsFollowed } from "@/lib/utils";
import { Models } from "appwrite"
import React, {  useState } from "react";

type FollowStatsProps ={
    followId: Models.Document;
    userId: string;
}



const FollowStats = ({followId, userId}: FollowStatsProps) => {
        const followsList = followId.follows.map((user:Models.Document) =>user.$id)
        

        const [follows, setFollows] = useState(followsList);
       


        const { mutate: followUser} = useFollowUser();
       
        //const { data: currentUser} = useGetCurrentUser();
        
   

   
    
        


/// to like and dislike
        const handleFollowUser = (e: React.MouseEvent) => {
            e.stopPropagation();

            let newFollows = [...follows];
            const hasfollowed= newFollows.includes(userId);
            if(hasfollowed) {
                newFollows= newFollows.filter((id) => id !== userId);
            } else {
                newFollows.push(userId);
            }
            setFollows(newFollows);
            followUser({ followId: follows.$id, followsArray: newFollows})
        }



  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
            <img 
                src={checkIsFollowed(follows, userId) ? '/assets/icons/liked.svg' : '/assets/icons/like.svg' }  alt="follow"    width={20} height={20} 
                onClick={handleFollowUser}
                className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">{follows.length}</p>

        </div>
        
            

     
    </div>


    
  )
}

export default FollowStats