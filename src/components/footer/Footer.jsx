import React from 'react'
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <>

     <Footer container className='bg-primary-700 rounded-none'>
      <FooterCopyright className='text-white' by="Lodgy Magdy™" year={2025} />
      <FooterLinkGroup className='text-white'>
        <FooterLink as={ Link } to='/'>Home</FooterLink>
        <FooterLink as={ Link } to='/profile'>Profile</FooterLink>
        <FooterLink as={ Link } to='/login'>Login</FooterLink>
        <FooterLink as={ Link } to='/register'>Register</FooterLink>
      </FooterLinkGroup>
    </Footer>

    </>
  )
}
