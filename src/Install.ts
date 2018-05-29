import * as minimist from "minimist"
import * as fs from "fs"
import * as os from "os"
import * as https from "https"
import * as path from "path"
import * as mkdirp from "mkdirp"

import * as extract from "extract-zip"
const targz = require("targz")
import * as cp from "child_process"

export const finalize = async (downloadedFilePath: string, destPath: string): Promise<string> => {
    switch (os.platform()) {
        case "win32":
            return windows(downloadedFilePath, destPath)
        case "linux":
            return linux(downloadedFilePath, destPath)
        case "darwin":
            return darwin(downloadedFilePath, destPath)
        default:
            throw new Error("Unknown platform: " + os.platform())
    }
}

const windows = async (zipPath: string, destPath: string): Promise<string> => {
    return new Promise<string>((res, rej) => {
        extract(zipPath, { dir: destPath }, err => {
            if (err) {
                rej(err)
                return
            }

            const resultPath = path.join(destPath, "Oni.exe")

            res(resultPath)
        })
    })
}

const linux = async (tarPath: string, destPath: string): Promise<string> => {
    return new Promise<string>((res, rej) => {
        targz.decompress(
            {
                src: tarPath,
                dest: destPath,
            },
            (err: Error) => {
                if (err) {
                    rej(err)
                    return
                }

                res(path.join(destPath, "oni"))
            },
        )
    })
}

export const darwin = async (dmgPath: string, destPath: string): Promise<string> => {
    const output = cp.execSync(`hdiutil attach ${dmgPath}`).toString("utf8")

    const lines = output.split(os.EOL)

    const [oniLine] = lines.filter(l => l.indexOf("Oni") >= 0)

    const info = oniLine.split("/t")
    const mountRoot = info[0]
    const directory = info[info.length - 1]

    console.log("DMG mount name: " + mountRoot)
    console.log("DMG mount path: " + directory)

    return Promise.resolve("")
}
