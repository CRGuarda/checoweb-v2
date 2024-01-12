/* eslint-disable @next/next/no-img-element */
import { getPaymentsImages } from '@/lib/aws-s3/get-payments-images'

const Page = async ({ params }: { params: { idClient: string; idLoan: string } }) => {
  const { idClient, idLoan } = params
  const res = await getPaymentsImages(idClient, idLoan)
  if (!res)
    return (
      <h2 className='font-bold text-xl md:text-3xl text-center pt-10 text-red-700'>
        NO EXISTEN PAGOS, REVISAR EL ID DEL CLIENTE Y DEL PRÉSTAMO
      </h2>
    )
  return (
    <>
      <h3 className='py-4 text-lg md:text-xl text-center'>Pagos del préstamo {idLoan}</h3>
      <section className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2'>
        {res.map(({ imageURL, key }) => {
          return (
            <div key={key} className=''>
              <a href={imageURL} target='_blank'>
                <img src={imageURL} alt={`Payment for ${idLoan}`} />
              </a>
            </div>
          )
        })}
      </section>{' '}
    </>
  )
}
export default Page
