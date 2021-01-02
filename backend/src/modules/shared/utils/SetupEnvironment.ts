import moduleAlias from 'module-alias'
import fs from 'fs'

export default function setupEnvironment(rootPath: string, envFile: string): void {
    moduleAlias.addAliases({
        '@': rootPath
    })

    if (!fs.existsSync(envFile)) {
        throw new Error(`Environment file "${envFile}" not exists`)
    }
}
