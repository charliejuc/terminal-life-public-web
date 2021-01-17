import './modules/shared/utils/PrepareEnvironment'
import { buildServer } from '@/FastifyServer'
import { getPortOrFail } from '@/modules/shared/utils/Server'
import { isDevelopment } from '@/modules/shared/utils/Environment'
import { handleFatalError } from '@/modules/shared/utils/Error'
import { FastifyInstance } from 'fastify'

buildServer({
    logger: {
        prettyPrint: isDevelopment
    }
})
    .then((server: FastifyInstance) => {
        server.listen(getPortOrFail(), handleFatalError)
    })
    .catch(handleFatalError)
