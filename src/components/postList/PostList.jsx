import  { useContext } from 'react'
import PostItem from '../postItem/PostItem'
import { authContext } from './../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import Skeleton from 'react-loading-skeleton';

export default function PostList({isHome = true}) {

  const {userData} = useContext(authContext)

  const queryKey = isHome ? ["all-posts"] : ["user-posts"]

  const apiURL = isHome ? `posts?limit=20&sort=-createdAt` : `users/${userData?._id}/posts` 

  const {data , isLoading , isError , error} = useFetch(queryKey , apiURL , userData)
  

  return (
    <>
    <section className='py-12'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex flex-col gap-6'>
           {isLoading && <Skeleton className='h-96 mb-4' baseColor='#C3DDFD' highlightColor='#1A56DB' count={5}/>}
           {isError && <div className='font-bold text-red-500 text-center text-4xl'>{error}</div>}
           { data && data.posts.map((post) => <PostItem key={post._id} post={post}/>)}
          </div>
        </div>
    </section>
    </>
  )
}
