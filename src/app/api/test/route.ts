import { executeQuery } from '@/lib/aws-rds/execute-queries'

export const GET = async () => {
  const response = await executeQuery(
    'SELECT TP.* FROM T_CLIENTE TC, T_PRESTAMO TP WHERE TC.ID_CLIENTE = TP.ID_CLIENTE AND TC.ID_CLIENTE=165'
  )
  return Response.json(response)
}
