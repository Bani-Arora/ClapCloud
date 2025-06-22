import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'social_media',
    allowedFormats: ['jpg','jpeg','png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
})

export default multer({ storage })
