import './modules/shared/utils/PrepareEnvironment'
import { getPortOrFail } from '@/modules/shared/utils/Server'
import { isDevelopment } from '@/modules/shared/utils/EnvironmentGuard'
import { handleFatalError } from '@/modules/shared/utils/Error'
import { FastifyInstance } from 'fastify'
import { buildServer } from '@/BuildFastifyServer'

buildServer({
    logger: {
        prettyPrint: isDevelopment
    }
})
    .then((server: FastifyInstance) => {
        server.listen(getPortOrFail(), handleFatalError)
    })
    .catch(handleFatalError)
