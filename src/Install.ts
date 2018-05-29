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

export const osx = async (dmgPath: string, destPath: string): Promise<string> => {
    cp.execSync(`hdiutil attach ${dmgPath}`)
}
