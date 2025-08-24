import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { lazy, Suspense, useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Helmet } from 'react-helmet'

const PostItem = lazy(() => import("../../components/postItem/PostItem"))

export default function PostDetails() {

  const { id } = useParams() 

  const {userData} = useContext(authContext)

  const {data , isLoading , isError , error} = useFetch(["details-posts" , id] , `posts/${id}` , userData)

  
  return (
    <>
    <Helmet><title>Kudo | PostDetails</title></Helmet>
    <section className='py-12'>
            <div className='max-w-3xl mx-auto'>
              <div className='flex flex-col gap-6'>
               {isLoading && <div className='font-bold text-primary-200 text-center text-4xl'>Loading...</div>}
               {isError && <div className='font-bold text-red-500 text-center text-4xl'>{error}</div>}   
               { data && <Suspense fallback={<div className="text-primary-200">Loading...</div>}><PostItem post={data.post} showAllComments={true}/> </Suspense>}
              </div>
            </div>
        </section>
    </>
  )
}
