import { createBrowserRouter } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Guard from "../guard/Guard";
import GuardAuth from "../guardAuth/GuardAuth";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../../pages/login/Login"))
const Register = lazy(() => import("../../pages/register/Register"))
const Posts = lazy(() => import("../../pages/posts/Posts"))
const NotFound = lazy(() => import("../../pages/notfound/NotFound"))
const PostDetails = lazy(() => import("../../pages/postDetails/PostDetails"))
const Profile = lazy(() => import("../../pages/profile/Profile"))
const ChangePassword = lazy(() => import("../../pages/changePassword/ChangePassword"))

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
            index: true,
            element: <Guard><Suspense fallback={<div className="text-primary-200">Loading...</div>}><Posts/></Suspense></Guard>
            },{
            path: '/posts',
            element: <Guard><Suspense fallback={<div className="text-primary-200">Loading...</div>}><Posts/></Suspense></Guard>
           },{
            path: '/posts/:id',
            element: <Guard><Suspense fallback={<div className="text-primary-200">Loading...</div>}><PostDetails/></Suspense></Guard>
           },{
            path: '/profile',
            element: <Guard><Suspense fallback={<div className="text-primary-200">Loading...</div>}><Profile/></Suspense></Guard>
           },,{
            path: '/change-password',
            element: <Guard><Suspense fallback={<div className="text-primary-200">Loading...</div>}><ChangePassword/></Suspense></Guard>
           },{
            path: '/login',
            element: <GuardAuth><Suspense fallback={<div className="text-primary-200">Loading...</div>}><Login/></Suspense></GuardAuth>
           },{
            path: '/register',
            element: <GuardAuth><Suspense fallback={<div className="text-primary-200">Loading...</div>}><Register/></Suspense></GuardAuth>
           },{
            path: '*',
            element: <Suspense fallback={<div className="text-primary-200">Loading...</div>}><NotFound/></Suspense>
           }
        ]
    }
])
