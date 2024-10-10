import {useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost, createUserAccount, deletePost, deleteSavedPost, followUser, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserById, getUserPosts, getUsers, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateUser } from "../appwrite/api"
import { ID } from "appwrite"
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from "@/types"
import { QUERY_KEYS } from "./queryKeys"







// ============================================================
// AUTH QUERIES
// ============================================================

//sigup mutation 
export const useCreateUserAccount= () => {
   return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user)
   }); 
}

//loging mutation
export const useSignInAccount = () => {
    return useMutation({
     mutationFn: (user:{ 
        email:string; 
        password:string;
    }) => signInAccount(user),
    }); 
 }


 //sign out function 

 export const useSignOutAccount = () => {
   return useMutation({
    mutationFn: signOutAccount
   }); 
}
/////POST CEATION and ALL

export const useGetPosts = () => {
   return useInfiniteQuery({
     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
     queryFn: getInfinitePosts,
     getNextPageParam: (lastPage) => {
       // If there's no data, there are no more pages.
       if (lastPage && lastPage.documents.length === 0) {
         return null;
       }
 
       // Use the $id of the last document as the cursor.
       const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
       return lastId;
     },
   });
 };
 
 export const useSearchPosts = (searchTerm: string) => {
   return useQuery({
     queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
     queryFn: () => searchPosts(searchTerm),
     enabled: !!searchTerm,
   });
 };
 


export const useCreatePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (post: INewPost) => createPost(post),
     onSuccess: () => {
      queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
     }
    
   });
 };

 export const useGetPostById = (postId?: string) => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
     queryFn: () => getPostById(postId),
     enabled: !!postId,
   });
 };
 
 export const useGetUserPosts = (userId?: string) => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
     queryFn: () => getUserPosts(userId),
     enabled: !!userId,
   });
 };
 
 export const useUpdatePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (post: IUpdatePost) => updatePost(post),
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
       });
     },
   });
 };
 
 export const useDeletePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
       deletePost(postId, imageId),
     onSuccess: () => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });
     },
   });
 };



 export const useGetRecentPosts = () => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
     queryFn: getRecentPosts,
   });
 };

 //like post 
 export const useLikePost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: ({
       postId,
       likesArray,
     }: {
       postId: string;
       likesArray: string[];
     }) => likePost(postId, likesArray),
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
     },
   });
 };
 //// follow
 export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      followId,
      followsArray,
    }: {
      followId: string,
      followsArray: string[];
    }) => followUser(followId, followsArray),
    onSuccess: (data) => {
     
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FOLLOWS, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

 /// Save post 

 export const useSavePost = () => {
   const queryClient = useQueryClient();

   return useMutation({
     mutationFn: ({postId, userId }: { userId: string; postId: string }) =>
       savePost(postId, userId ),
     onSuccess: () => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
     },
   });
 };
 
 export const useDeleteSavedPost = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
     onSuccess: () => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_POSTS],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
     },
   });
 };
 

 ////user part 

 export const useGetCurrentUser = () => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
     queryFn: getCurrentUser,
   });
 };
 
 export const useGetUsers = (limit?: number) => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_USERS],
     queryFn: () => getUsers(limit),
   });
 };
 
 export const useGetUserById = (userId: string) => {
   return useQuery({
     queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
     queryFn: () => getUserById(userId),
     enabled: !!userId,
   });
 };
 
 export const useUpdateUser = () => {
   const queryClient = useQueryClient();
   return useMutation({
     mutationFn: (user: IUpdateUser) => updateUser(user),
     onSuccess: (data) => {
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
       });
       queryClient.invalidateQueries({
         queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
       });
     },
   });
 };