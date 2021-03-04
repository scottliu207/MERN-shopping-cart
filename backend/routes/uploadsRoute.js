// Upload middleware and route.
import express from "express"
import multer from "multer"
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (file, cb) => {
  const filetype = /jpg|jpeg|png/
  const extName = filetype.test(path.extname(file.originalname))
  const mimetype = filetype.test(path.extname(file.mimetype))

  if (extName && mimetype) {
    return cb(null, true)
  } else {
    cb("僅接受圖片格式")
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

router.route("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
