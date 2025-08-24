import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'


const Add = lazy(() => import("../../components/add/Add"))
const PostList = lazy(() => import("../../components/postList/PostList"))
const ProfileCard = lazy(() => import("../../components/profileCard/ProfileCard"))

export default function Profile() {
  return (
    <>
    <Helmet><title>Kudo | Profile</title></Helmet>
    <Suspense fallback={<div className="text-primary-200">Loading...</div>}><Add/></Suspense>
    <Suspense fallback={<div className="text-primary-200">Loading...</div>}><ProfileCard/></Suspense>
    <Suspense fallback={<div className="text-primary-200">Loading...</div>}><PostList isHome={false}/></Suspense>
    </>
  )
}
