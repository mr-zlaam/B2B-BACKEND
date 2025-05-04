import multer from "multer";
import path from "node:path";

export const supportedFileTypes = ["pdf", "txt", "doc", "docx", "dot", "dotx", "odt", "ott", "wps", "rtf", "wpd"];

const storage = multer.diskStorage({
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  }
});

const fileFilter = (_: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const fileExtension = path.extname(file.originalname).toLowerCase().slice(1);
  if (!supportedFileTypes.includes(fileExtension)) {
    return cb(new Error(`Unsupported file type: ${file.originalname}. Allowed types: ${supportedFileTypes.join(", ")}`));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  dest: path.resolve(__dirname, "public/temp"),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5
  },
  fileFilter
});

export const fileUploader = (maxFilescount?: number) => upload.array("docs", maxFilescount ?? 1);
