import * as minimist from "minimist"
import * as fs from "fs"
import * as https from "https"
import * as path from "path"
import * as mkdirp from "mkdirp"

import * as request from "request"
import * as rp from "request-promise-native"

const requestProgress = require("request-progress")

import { BuildCache } from "./BuildCache"

const argv = minimist(process.argv.slice(2))

const currentDirectory = path.join(__dirname, "..")
const cacheDirectory = path.join(currentDirectory, ".build-cache")
const cacheManifest = path.join(cacheDirectory, "builds.json")

if (!fs.existsSync(cacheDirectory)) {
    mkdirp.sync(cacheDirectory)
}

if (!fs.existsSync(cacheManifest)) {
    fs.writeFileSync(cacheManifest, "{}")
}

const buildCache = new BuildCache(cacheManifest)

if (argv._[0] === "path") {
    const buildName = argv._[1]

    const buildInfo = buildCache.getBuildInfo(buildName)

    if (buildInfo) {
        console.log(buildInfo.filePath)
        process.exit(0)
    } else {
        console.error(`No build ${buildName} found. Run 'ovm install ${buildName}'`)
        process.exit(1)
    }
} else if (argv._[0] === "install") {
    const buildName = argv._[1]

    const getPackageFromInfo = (info: any) => {
        return info.packages.windows.zip
    }

    const getDownloadFileName = (info: any) => {
        return "temp.zip"
    }

    const exec = (async () => {
        const info = JSON.parse(await rp(`https://api.onivim.io/v1/downloads/meta/${buildName}`))

        const packagePath = getPackageFromInfo(info)
        const fileName = getDownloadFileName(info)

        const file = fs.createWriteStream(path.join(cacheDirectory, fileName))

        requestProgress(request(packagePath))
            .on("progress", (state: any) => {
                console.log("Download progress: " + state.percent)
            })
            .on("finish", () => {
                console.log("Download complete!")
                // buildCache.setBuildInfo(buildName, {

                // })
            })
            .pipe(file)
    })()

    // const metadata = await request(`https://api.onivim.io/v1/downloads/meta/${buildName}`)
    // metadata.
}

console.dir(argv)

// const log = (message: string, callback?: () => void) => {
//     if (!callback) {
//         console.log(message)
//     } else {
//         console.log("START: " + message)
//         callback()
//         console.log("END: " + message)
//     }
// }

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
