import * as minimist from "minimist"
import * as fs from "fs"
import * as https from "https"
import * as path from "path"
import * as mkdirp from "mkdirp"

export type BuildInfo = {
    filePath: string
}

export type BuildNameToInfo = { [key: string]: BuildInfo }

export class BuildCache {
    private _cache: BuildNameToInfo = {}

    constructor(private _cacheFile: string) {
        this._cache = {}
        if (fs.existsSync(this._cacheFile)) {
            const file = fs.readFileSync(this._cacheFile).toString("utf8")
            this._cache = JSON.parse(file)
        }
    }

    public getBuildInfo(buildName: string): BuildInfo | null {
        return this._cache[buildName] || null
    }

    public setBuildInfo(buildName: string, info: BuildInfo): void {
        this._cache[buildName] = info

        fs.writeFileSync(this._cacheFile, JSON.stringify(this._cache))
    }
}
