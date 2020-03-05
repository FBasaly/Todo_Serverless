import 'source-map-support/register'
import * as elasticsearch from 'elasticsearch'
import * as httpAwsEs from 'http-aws-es'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { createLogger } from '../../utils/logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
const logger = createLogger('searchTodo');

const esHost = process.env.ES_ENDPOINT

const es = new elasticsearch.Client({
    hosts: [esHost],
    connectionClass: httpAwsEs
})

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing event: ', event)
    console.log('Processing event: ', event)
    const searchDueDate = event.pathParameters.dueDate
    console.log('filter todos by: ', searchDueDate)

    const response = await es.search({
        q: searchDueDate
    })
    console.log('search result :', response.hits.hits)
    let searchResult: any[] = [];
    for (const todo of response.hits.hits) {
        searchResult.push(todo._source)
    }
    return {
        statusCode: 200,
        body:JSON.stringify({
            items: searchResult,
        }),
    };
})

handler.use(
    cors({
        credentials: true
    })
)