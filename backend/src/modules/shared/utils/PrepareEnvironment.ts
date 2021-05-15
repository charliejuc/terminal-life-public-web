import { distPath, rootPath } from '../../../modules/shared/utils/Path'
import setupEnvironment from '../../../modules/shared/utils/SetupEnvironment'

const envFile = `${distPath}/.env`

setupEnvironment(rootPath, envFile)
