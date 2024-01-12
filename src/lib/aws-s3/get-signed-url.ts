import { s3 } from '@/lib/aws-s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const IMAGE_RESPONSE_TYPE = 'image/jpeg'

export const getSignedURL = async (bucket: string, key: string, expiresIn?: 60) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      ResponseContentType: IMAGE_RESPONSE_TYPE,
    })

    const signedURL = await getSignedUrl(s3, command, { expiresIn })

    return signedURL
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
