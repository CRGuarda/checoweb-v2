import { executeQuery } from '@/lib/aws-rds/execute-queries'
import { getActiveLoanByIDClientQuery } from '@/lib/aws-rds/queries'

type activeLoan = {
  ID_CLIENTE: number
  NOMBRE_COMPLETO: string
  ID_PRESTAMO: string
}

// eslint-disable-next-line no-unused-vars
export const GET = async (request: Request, { params }: { params: { idLoan: string } }) => {
  try {
    const { idLoan } = params

    const response = (await executeQuery(getActiveLoanByIDClientQuery, [idLoan])) as activeLoan[]
    return Response.json(response)
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    return Response.json({ response: message }, { status: 404 })
  }
}
