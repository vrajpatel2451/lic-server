import ImageKit from "imagekit"
import path from 'path'

class ImageKitOperationsOperations {
    #imageKit;
    constructor(){
        this.#imageKit = new ImageKit({
            publicKey : process.env.IMAGEKIT_PUBLIC,
            privateKey : process.env.IMAGEKIT_PRIVATE,
            urlEndpoint : process.env.IMAGEKIT_ENDPOINT
        });
    }
    async uploadFile(file) {
       const result = await this.#imageKit.upload({
            file : path.join(`${global.mydir}/uploads/${file.filename}`), //required
            fileName : file.filename,   //required
            // extensions: [
            //     {
            //         name: "google-auto-tagging",
            //         maxTags: 5,
            //         minConfidence: 95
            //     }
            // ]
        });
        return result;
    }
    getUrl(url) {
        const modifiedUrl = this.#imageKit.url({
          src: url,
          transformation: [
            {
              height: "500",
              width: "500",
              format: "png",
            }
          ]
        })
        return modifiedUrl;
    }
}

export default ImageKitOperationsOperations;