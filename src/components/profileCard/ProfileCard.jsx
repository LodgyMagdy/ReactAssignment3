import { Avatar, Card, FileInput, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppButton from "../appButton/AppButton";
import { toast } from "react-toastify";
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileImageSchema } from "../../schema/profileCardImageSchema/ProfileCardImageSchema";
import ValidationError from './../validationError/ValidationError';


export default function ProfileCard() {

  const {userData , getProfileData} = useContext(authContext)
  const [openModal, setOpenModal] = useState(false)
  const queryClient = useQueryClient()

  const {register , handleSubmit , formState: {errors}} = useForm({resolver: zodResolver(ProfileImageSchema) , mode: "onChange"})

  async function changeProfilePhoto (data) {
 
    const formData = new FormData()
    formData.append("photo" , data.photo[0])

    return await axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo` , formData , {
        headers: {


            token: localStorage.getItem("token")
        }
    })
  }

  const {mutate: handleChangeProfilePhoto , isPending} = useMutation({mutationFn: changeProfilePhoto ,
    onSuccess: () => {
        setOpenModal(false)
        toast.success("Photo updated successfully")
        getProfileData(localStorage.getItem("token"))
        queryClient.invalidateQueries(["profile-posts"])
        queryClient.invalidateQueries(["all-posts"])
        
      } ,
      onError: () => {
        toast.error("Photo updating failed")
      } 

  })

  return (
    <>
     <Card className='max-w-3xl mx-auto bg-primary-200'>
      {userData && <div className="flex flex-col items-center pb-10">
        <div className="relative">
        <Avatar className="mb-3 rounded-full shadow-lg size-24 avatar bg-primary-700" alt="User settings" img={userData.photo} rounded />
        
        <MdEdit className="cursor-pointer size-8 rounded absolute bottom-0 right-0 top-17 bg-primary-700 text-white" onClick={() => setOpenModal(true)}/>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData.dateOfBirth}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{userData.gender}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link
            to={"/change-password"}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-primary-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Change password
          </Link>
        </div>
      </div>}
      
    </Card>
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} >
        <ModalHeader />
        <ModalBody>

         {errors.photo && <ValidationError error={errors.photo?.message}/>}

          <form onSubmit={handleSubmit(handleChangeProfilePhoto)} className="flex flex-col gap-4 w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput {...register("photo")} id="dropzone-file" className="hidden" />
      </Label>
      <AppButton type="submit">{isPending ? "Uploading..." : "Upload"}</AppButton>
    </form>
        </ModalBody>
      </Modal>
    </>
  )
}
