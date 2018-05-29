import * as minimist from "minimist"
import * as fs from "fs"
import * as http from "http"
import * as https from "https"
import * as path from "path"
import * as mkdirp from "mkdirp"

export const request = (url: string): Promise<http.IncomingMessage> => {
    return new Promise<http.IncomingMessage>(res => {
        https.get(url, incomingMessage => {
            res(incomingMessage)
        })
    })
}

// const downloadFilePath =
//     "https://api.onivim.io/v1/downloads/builds?branch=master&file=Oni-0.3.5-win.zip"

// const downloadFile = (url: string, destinationFilePath: string): Promise<void> => {
//     return new Promise((res, rej) => {
//         log("Starting download...")
//         const file = fs.createWriteStream(destinationFilePath)
//         const callback = async (response: any) => {
//             if (response.statusCode === 302) {
//                 const location = response.headers.Location || response.headers.location
//                 log("Received 302 redirect to: " + destinationFilePath)
//                 https.get(location, callback)
//             } else {
//                 log("...piping download to file...")
//                 response.pipe(file)

//                 file.on("finish", () => {
//                     log("Download complete")
//                     ;(file as any).close(res)
//                 })
//             }
//         }

//         https.get(url, callback)
//     })
// }

// downloadFile(downloadFilePath, path.join(cacheDirectory, "derp.zip"))
