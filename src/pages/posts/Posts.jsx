
import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'

const PostList = lazy(() => import("../../components/postList/PostList"))
const Add = lazy(() => import("../../components/add/Add"))

export default function Posts() {
  return (
    <>
    <Helmet><title>Kudo | Posts</title></Helmet>
    <Suspense fallback={<div className="text-primary-200">Loading...</div>}><Add/></Suspense>
    <Suspense fallback={<div className="text-primary-200">Loading...</div>}><PostList/></Suspense>
    </>
  )
}
