import { executeQuery } from '@/lib/aws-rds/execute-queries'
import { getClientInfoQuery } from '@/lib/aws-rds/queries'

// eslint-disable-next-line no-unused-vars
export const GET = async (request: Request, { params }: { params: { dniClient: string } }) => {
  try {
    const { dniClient } = params

    const response = await executeQuery(getClientInfoQuery, [`${dniClient}%`])
    return Response.json(response)
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    return Response.json({ response: message }, { status: 404 })
  }
}
