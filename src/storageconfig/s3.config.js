import multer from 'multer';
import multerS3 from 'multer-s3';
import {S3Client} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const fileFilter = (req, files, cb) => {
    // reject a file
    if (
      files.mimetype === "image/jpeg" ||
      files.mimetype === "image/pipeg" ||
      files.mimetype === "image/png" ||
      files.mimetype === "image/svg" ||
      files.mimetype === "audio/mp3" ||
      files.mimetype === "audio/mpeg" ||
      files.mimetype === "audio/wav" ||
      files.mimetype === "audio/ogg" ||
      files.mimetype === "video/x-flv" ||
      files.mimetype === "video/ogg" ||
      files.mimetype === "video/mp4" ||
      files.mimetype === "video/webm" ||
      files.mimetype === "application/x-mpegURL" ||
      files.mimetype === "video/MP2T" ||
      files.mimetype === "video/3gpp" ||
      files.mimetype === "video/quicktime" ||
      files.mimetype === "video/x-msvideo" ||
      files.mimetype === "video/x-ms-wmv" ||
      files.mimetype === "application/msword" ||
      files.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      files.mimetype === "application/pdf" ||
      files.mimetype === "application/vnd.oasis.opendocument.text" ||
      files.mimetype === "text/plain"
      || files.mimetype === 'application/octet-stream'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const metaData = (req, file, cb) => {
    cb(null, { fieldName: file.fieldname.toString().toLowerCase().replace(/\s/g,'+') });
};
  
const key = (req, file, cb) => {
    const storyId = uuidv4();
    cb(null, Date.now().toString() + "_" + storyId + "_" + file.originalname.replace(/\s/g,'+'));
};


const credentials = {
    region: process.env.REGION || '',
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY || ''
    }
  };


const s3 = new S3Client(credentials);

export const mediaUploader = multer({
    storage: multerS3({
      s3: s3,
      bucket: "madhavinsurance",
      acl: "public-read",
      metadata: metaData,
      key: key,
    }),
    limits: {
      fileSize: 1024 * 1024 * 250,
    },
    fileFilter: fileFilter,
});