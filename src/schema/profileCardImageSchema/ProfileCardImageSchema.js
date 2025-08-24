import * as z from "zod"

const MAX_UPLOAD_SIZE = 4 * 1024 * 1024
const ALLOWED_IMAGES_TYPES = ["image/jpeg" , "image/png" , "image/jpg"]

export const ProfileImageSchema = z.object({
    photo: z.instanceof(FileList)
    .refine((files) => files[0].size <= MAX_UPLOAD_SIZE , "Image size must be less than 4MB")
    .refine((files) => ALLOWED_IMAGES_TYPES.includes(files[0].type) , "Image type must be jpeg , png or jpg")
})