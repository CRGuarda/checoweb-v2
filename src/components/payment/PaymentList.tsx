'use client'
import { PaymentItem } from '@/components/payment/PaymentItem'
import { queuePayment } from '@/types/payment.type'
import { useState } from 'react'

export default function PaymentList({ payments }: { payments: queuePayment[] }) {
  const [paymentsList, setPaymentsList] = useState(payments)

  const deletePayment = (keyToDelete: string) => {
    return setPaymentsList((prevState) => prevState?.filter(({ key }) => key !== keyToDelete))
  }
  return (
    <section className='flex flex-col gap-14 md:gap-8'>
      {paymentsList?.map((payment) => (
        <PaymentItem payment={payment} key={payment.key} deletePayment={deletePayment} />
      ))}
    </section>
  )
}
