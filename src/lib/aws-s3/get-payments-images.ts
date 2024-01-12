import { s3 } from '@/lib/aws-s3'
import { getSignedURL } from '@/lib/aws-s3/get-signed-url'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'

export const getPaymentsImages = async (idClient: string, idLoan: string) => {
  const params = {
    Bucket: process.env.AWS_PAYMENTS_BUCKET as string,
    Prefix: `${idClient}/${idLoan}`,
  }
  try {
    const command = new ListObjectsV2Command(params)
    const { Contents } = await s3.send(command)
    if (!Contents) return
    // Sorting by Date
    const sortedPayments = Contents.sort((a, b) => (a.LastModified?.getTime() || 0) - (b.LastModified?.getTime() || 0))

    const paymentsData = await Promise.all(
      sortedPayments?.map(async ({ Key }) => {
        // Get signed URL
        const imageURL = (await getSignedURL(params.Bucket, Key as string)) as string

        return {
          imageURL,
          key: Key,
        }
      })
    )

    return paymentsData
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    throw new Error(message)
  }
}
