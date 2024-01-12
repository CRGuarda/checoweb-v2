import PaymentList from '@/components/payment/PaymentList'
// ToDo: Establish if want cache for like 2 seconds.

const getPayments = async () => {
  try {
    const paymentsRequest = await fetch(`${process.env.APP_URL}/api/payments`, { cache: 'no-store' })
    if (!paymentsRequest.ok) return undefined
    return paymentsRequest.json()
  } catch (error) {
    return undefined
  }
}

const page = async () => {
  const paymentsList = await getPayments()
  if (!paymentsList || !paymentsList.length)
    return (
      <h2 className='h-max w-full text-4xl md:text-7xl text-center font-bold bg-accent-green'>Payment queue empty</h2>
    )

  return <PaymentList payments={paymentsList} />
}
export default page
