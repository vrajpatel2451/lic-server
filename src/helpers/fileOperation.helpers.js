import multer from "multer";
import path from 'path'

class FileOperations {
    #storage;
    constructor(){
      this.#storage = multer.diskStorage({
        destination: function (req, file, callback) {
              // console.log('uploads');
              callback(null, 'uploads');
            },
            filename: function (req, file, callback) {
              callback(null, (new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear()+'-'+new Date().getHours()+'-'+new Date().getMinutes()+'-'+new Date().getSeconds()+'-'+file.originalname));
            }
          });
    }
    upload=(cb,limits)=>multer({
      // dest:'../uploads',
      fileFilter:cb,
      limits,
      storage:this.#storage,
    });
}

export default FileOperations