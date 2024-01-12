'use client'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { queuePayment } from '@/types/payment.type'
import { useAlerts } from '@/hooks/useAlerts'
import Swal from 'sweetalert2'
import { useFormatDate } from '@/hooks/useFormatDate'
import Link from 'next/link'
import { SearchIcon } from '@/components/icons/Icons'

export const PaymentItem = ({
  payment,
  deletePayment,
}: {
  payment: queuePayment
  // eslint-disable-next-line no-unused-vars
  deletePayment: (key: string) => void
}) => {
  const { customAlert } = useAlerts()
  const [paymentForm, setPaymentForm] = useState({
    ID_CLIENTE: payment?.userData?.ID_CLIENTE,
    ID_PRESTAMO: payment?.userData?.ID_PRESTAMO,
    PAGO: payment?.userData?.CUOTA,
    Key: payment?.key,
    FECHA_HORA: payment?.lastModified,
  })
  const { formattedDate } = useFormatDate(payment?.lastModified)

  const handleQuotaChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPaymentForm((prevState) => ({
      ...prevState,
      PAGO: e.target.value,
    }))

  const handleDelete = async (key: string) => {
    const { isConfirmed, value } = await customAlert({
      title: `¿Estás seguro que deseas eliminar esta imagen?`,
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#F87171',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const deleteRequest = await fetch('/api/payments', {
            method: 'DELETE',
            body: JSON.stringify({ key }),
          })
          if (!deleteRequest.ok) {
            return Swal.showValidationMessage(`
          ${JSON.stringify(await deleteRequest.json())}
        `)
          }
          return deleteRequest.json()
        } catch (error) {
          Swal.showValidationMessage(`
        Delete request failed: ${error}
      `)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
    if (!isConfirmed) return

    await customAlert({
      title: value.message,
      icon: 'success',
    })
    deletePayment(key)
  }

  const handleConfirmation = async (key: string) => {
    const { isConfirmed, value } = await customAlert({
      title: `¿Registrar S/${paymentForm.PAGO} de ${payment?.userData?.NOMBRE_COMPLETO}`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#49a080',
      confirmButtonText: 'Sí, registrar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const registerRequest = await fetch('/api/payments', {
            method: 'POST',
            body: JSON.stringify(paymentForm),
          })
          if (!registerRequest.ok) {
            return Swal.showValidationMessage(`
          ${JSON.stringify(await registerRequest.json())}
        `)
          }

          return registerRequest.json()
        } catch (error) {
          Swal.showValidationMessage(`
        Delete request failed: ${error}
      `)
        }
      },
    })

    if (!isConfirmed) return

    await customAlert({
      title: value.message,
      icon: 'success',
    })
    deletePayment(key)
  }
  return (
    <>
      <div className='w-full flex flex-col md:flex-row sm:gap-10 justify-center h-auto items-center gap-5'>
        <section className='flex justify-center w-[300px] h-[500px]'>
          <a href={payment?.imageURL as string} className='w-fit h-max place-self-center' target='_blank'>
            <Image
              src={payment?.imageURL as string}
              alt={`Payment voucher for ${payment?.userData?.NOMBRE_COMPLETO}`}
              width={380}
              height={500}
              style={{ width: 300, height: 510, objectFit: 'contain' }}
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8c+fXfwAJAQOzmNNi7wAAAABJRU5ErkJggg=='
              priority
            />
          </a>
        </section>
        <section className='flex flex-col gap-2 md:gap-3 uppercase w-full max-w-[300px] text-sm md:text-base border-l-4 border-l-primary pl-6'>
          <div className='flex flex-col'>
            <span className='font-bold'>Código de préstamo</span>
            <div className='flex justify-between items-center'>
              <span>{payment?.userData?.ID_PRESTAMO}</span>
              {payment?.userData?.ID_PRESTAMO && (
                <Link
                  href={`/payments/search/${payment?.userData?.ID_CLIENTE}/${payment?.userData?.ID_PRESTAMO}`}
                  className='bg-accent-lilac py-1 px-2 rounded-md text-sm mb-1'
                  title='Ir a pagos'
                >
                  <SearchIcon className='h-4 w-4 text-primary' />
                </Link>
              )}
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Código de cliente</span>
            <span>{payment?.userData?.ID_CLIENTE}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Nombre completo</span>
            <span>{payment?.userData?.NOMBRE_COMPLETO}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Fecha y hora</span>
            {formattedDate && <span>{formattedDate}</span>}
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Monto de cuota</span>
            <input
              value={paymentForm?.PAGO}
              className='border-2 rounded-md pt-1 pl-2 border-accent-lilac invalid:bg-red-400'
              onChange={handleQuotaChange}
              pattern='^[0-9]+([,.][0-9]{1,2})?$'
            />
          </div>
          <div className='flex justify-between'>
            <button
              className='border-red-400 rounded-lg bg-red-200 px-2 py-1 border'
              onClick={() => handleDelete(payment?.key)}
            >
              Eliminar
            </button>
            <button
              className='border border-secondary bg-green-100 px-2 py-1 rounded-lg'
              onClick={() => handleConfirmation(payment?.key)}
            >
              Registrar
            </button>
          </div>
        </section>
      </div>
      <div className='w-80 h-0.5 bg-accent-lilac place-self-center' />
    </>
  )
}
