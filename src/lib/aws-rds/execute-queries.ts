import { RDSPool } from '@/lib/aws-rds'

export const executeQuery = async (query: string, values?: any) => {
  try {
    const RDSConnection = await RDSPool.getConnection()
    const [results] = await RDSConnection.query(query, values)
    RDSConnection.release()

    return results
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    throw new Error(message)
  }
}
