import { executeQuery } from '@/lib/aws-rds/execute-queries'
import { insertPaymentQuery } from '@/lib/aws-rds/queries'
import { copyObject } from '@/lib/aws-s3/copy-object'
import { deleteObject } from '@/lib/aws-s3/delete-object'
import { getQueuePayments } from '@/lib/aws-s3/get-queue-payments'

export const GET = async () => {
  try {
    const paymentsData = await getQueuePayments()

    return Response.json(paymentsData || [])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return Response.json(error, { status: 404 })
  }
}

export const POST = async (request: Request) => {
  try {
    const { ID_CLIENTE, ID_PRESTAMO, PAGO, Key, FECHA_HORA } = await request.json()

    // Key structure -> 'client/51993848005/1272347456775740.jpeg'
    const [, , imageID] = Key.split('/')

    // eslint-disable-next-line no-console
    console.log({ ID_CLIENTE, ID_PRESTAMO, PAGO, Key, FECHA_HORA })
    // Insert payment into SQL
    await executeQuery(insertPaymentQuery, [ID_PRESTAMO, ID_CLIENTE, PAGO, FECHA_HORA])
    // Copy object from queue to payments
    await copyObject(`kambia-payments-queue/${Key}`, 'kambia-payments', `${ID_CLIENTE}/${ID_PRESTAMO}/${imageID}`)
    // Delete object from queue
    await deleteObject('kambia-payments-queue', Key)

    // ToDo -> WhatsApp Flow
    // const clientReport = await executeQuery(getClientReportQuery, [ID_CLIENTE])

    return Response.json({ message: 'Pago registrado en MySQL e imagen almacenada en kambia-payments.' })
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    return Response.json({ message }, { status: 404 })
  }
}

export const DELETE = async (request: Request) => {
  try {
    const { key } = await request.json()
    // Copy object from queue to trash
    await copyObject(`kambia-payments-queue/${key}`, 'kambia-payments-trash', key)
    // Delete object from queue
    await deleteObject('kambia-payments-queue', key)

    // ToDo -> WhatsApp Flow
    // Key structure -> 'client/51993848005/1272347456775740.jpeg'
    /* const [, from] = key.split('/') */

    return Response.json({ message: 'Successfully deleted' })
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    return Response.json({ message }, { status: 404 })
  }
}
