
import { Outlet } from 'react-router-dom';
import AppNavbar from '../navbar/Navbar';
import AppFooter from '../footer/Footer';
import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheck, HiX } from "react-icons/hi";



export default function Layout() {
  return (
    <>

    <AppNavbar/>

    <div className='min-h-screen'>

      <Offline>
        <Toast className='fixed top-24 right-3 z-50 bg-primary-700 text-white'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">You are offline</div>
        <ToastToggle />
      </Toast>
      </Offline>

      <Online>
        <Toast className='fixed top-24 right-3 z-50 bg-primary-700 text-white'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">You are online</div>
        <ToastToggle />
      </Toast>
      </Online>

    <Outlet/>
    </div>

    <AppFooter/>

    </>
  )
}
