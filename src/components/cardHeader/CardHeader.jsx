import { Avatar, Dropdown, DropdownItem } from 'flowbite-react'
import { FormatDate } from './../../lib/FormateDate';
import image from '../../assets/Images/avatar.png'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';


export default function CardHeader ({user: {name , photo , createdAt , _id} , mediaId  , isComment , setIsEditing , setIsEditingP}) {

  const queryClient = useQueryClient()

  const {userData} = useContext(authContext)

  const {mutate: handleDeletePost} = useMutation ({
    mutationFn: deletePostOrComment,
    onSuccess: () => {
              toast.success("Post deleted successfully")
              queryClient.invalidateQueries(["profile-posts"])
              queryClient.invalidateQueries(["all-posts"])
              
            } ,
        onError: () => {
              toast.error("Post deletion failed")
            }
  })

  const {mutate: handleDeleteComment} = useMutation ({
    mutationFn: deletePostOrComment,
    onSuccess: () => {
              toast.success("Comment deleted successfully")
              queryClient.invalidateQueries(["profile-posts"])
              queryClient.invalidateQueries(["all-posts"])
              
            } ,
        onError: () => {
              toast.error("Comment deletion failed")
            }
  })

  

  async function deletePostOrComment () {

    const endPoint = isComment ? "comments" : "posts"

     return await axios.delete(`${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}` , {
      headers: {
        token: localStorage.getItem("token")
      }
     })
  }

  return (
    <>
    <header className='flex items-center justify-between'>
      <div className='flex items-center'>
            <picture>
                <Avatar  img={!photo.includes("undefined")? photo : image } alt="avatar" rounded className='me-4'/>
            </picture>
            <div>
            <h2 className="text-lg mb-0 font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
            </h2>
            <span>{FormatDate(createdAt)}</span>
            </div>
      </div>
          {   userData?._id === _id  && <Dropdown inline label="">
          <DropdownItem onClick={ isComment ? (() => setIsEditing(true)) :( () => setIsEditingP(true))}>Edit</DropdownItem>
          
          <DropdownItem onClick={isComment ? handleDeleteComment : handleDeletePost}>Delete</DropdownItem>
        </Dropdown> }
          </header>
    
    </>
  )
}
