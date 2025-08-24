import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { authContext } from '../../context/AuthContext';

export default function AppNavbar() {

  const {token , setToken , userData} = useContext(authContext)
  const navigate = useNavigate()

  function handleLogout () {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }

  return (
    <>
    <Navbar className='bg-primary-700 text-white'>
      <NavbarBrand as={ Link } to='/'>
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kudo</span>
        
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={userData?.photo? userData.photo : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"} rounded />
          }
        >

        {token? 
        <>
        { userData &&
          <DropdownHeader>
            <span className="block text-sm">{userData.name}</span>
            <span className="block truncate text-sm font-medium">{userData.email}</span>
          </DropdownHeader> }
          <DropdownItem as={ Link } to='/profile'>Profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={handleLogout} as='button'>Sign out</DropdownItem>
        </> : 
        <>
          <DropdownItem as={ Link } to='/login'>Login</DropdownItem>
          <DropdownItem as={ Link } to='/register'>Register</DropdownItem>
        </>}
          
          
        </Dropdown>

        {token && <NavbarToggle />}
        
      </div>

      {token && <NavbarCollapse>
        <NavbarLink className='!text-white' as={ NavLink } to='/'>
          Home
        </NavbarLink>
        <NavbarLink className='!text-white' as={ NavLink } to='/posts'>Posts</NavbarLink>
      </NavbarCollapse>}
      
    </Navbar>
    </>
  )
}
