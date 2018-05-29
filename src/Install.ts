import * as minimist from "minimist"
import * as fs from "fs"
import * as https from "https"
import * as path from "path"
import * as mkdirp from "mkdirp"

import * as extract from "extract-zip"

export const windows = async (zipPath: string, destPath: string): Promise<string> => {
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
