import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@/lib/aws-s3'

export const deleteObject = async (bucketName: string, objectKey: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    })
    await s3.send(command)
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message
    throw new Error(message)
  }
}
