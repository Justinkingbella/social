
import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";


type PostCardProps = {
    post: Models.Document;
}

const PostCard = ({post}: PostCardProps) => {
    const {user} = useUserContext();


    if(!post.creator) return;

  return (
    <div className="post-card mt-9">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                <img
                   src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="creator" className=" w-12 rounded-full lg:h-12"
                 />
                </Link>

                <p className="base-medium lg:body-bold text-light-1">
                        {post.creator.name}
                    </p>
            </div>

              <Link to={`/update-post/${post.$id}`}
               className={`${user.id !== post.creator.$id &&  'hidden' }`}
              >
                <img src='/assets/icons/edit.svg' width={20} height={20}/>
              </Link>
        </div>
        <Link to={`/posts/${post.$id}`}>
        <img 
                src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                className="post-card_img mt-3" alt="post image"
            />
            <PostStats post={post} userId={user.id} />
            <div className="small-medium lg:base-medium py-5 ">
            <div className="flex-start gap-2 justify-center items-center">
                <p className="base-medium lg:body-bold text-light-1">
                    {post.creator.name}   
                </p>
                -
                <p className="subtle-semibold lg:small-regular "> 
                {post.caption}
                </p>
            </div>
                
                <ul className="flex gap-5 mt-2">
                    { post.tags.map((tag: string) =>(
                        <li key={tag} className="text-light-3">
                           #{tag} 
                        </li>
                    ))
                    }
                </ul>
            </div>
            
        
        <div className="flex flex-col ">
                    
                    <div className="flex-start gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular">
                        {multiFormatDateString(post.$createdAt)}
                        </p>
                        -
                        <p className="subtle-semibold lg:small-regular">
                            {post.location}</p>
                    </div>
                </div>
        </Link >
        

    </div>
  )
}

export default PostCard