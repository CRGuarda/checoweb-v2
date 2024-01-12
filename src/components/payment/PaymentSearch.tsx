'use client'
import { useInputText } from '@/hooks/useInputText'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export const PaymentSearch = () => {
  const router = useRouter()
  const [clientsList, setClientsList] = useState([])
  const { handleInput, inputForSearch, inputSearchId } = useInputText()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      if (!inputForSearch.length) return
      if (clientsList.some(({ ID_PRESTAMO }) => ID_PRESTAMO === inputForSearch)) return
      const clientsRequest = await fetch(`/api/payments/${inputForSearch}`)
      if (!clientsRequest.ok) return setClientsList([])
      const clientsResponse = await clientsRequest.json()
      setClientsList(clientsResponse)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    /* e.target.validity.valid && e.target.value.length <= 8 &&  */ handleInput(e.target.value)
  }

  return (
    <section className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <label htmlFor={inputSearchId}>
          Ingrese <span className='font-bold'>ID_PRESTAMO</span> para buscar pagos
        </label>
        <form className='flex flex-col md:flex-row gap-2 md:gap-4 w-max' onSubmit={handleSubmit}>
          <input
            type='text'
            id={inputSearchId}
            value={inputForSearch}
            onChange={handleInputChange}
            placeholder='20231201-1'
            /* ToDo: pattern='^[0-9]+$' */
            className='p-2 border-accent-lilac border rounded-md w-full md:w-[250px] focus-visible:outline-2 focus-visible:outline-primary'
          />
          <button
            type='submit'
            className='w-max border-2 p-2 place-self-center border-primary rounded-lg bg-accent-lilac disabled:border-gray-300 disabled:bg-gray-200 disabled:pointer-events-none disabled:text-gray-500'
            disabled={isLoading}
          >
            Buscar
          </button>
        </form>
      </div>
      {clientsList.length ? (
        <table className=' bg-secondary p-5 rounded-lg'>
          <thead>
            <tr>
              <th scope='col'>ID CLIENTE</th>
              <th scope='col' className='hidden md:block'>
                DNI
              </th>
              <th scope='col'>NOMBRE COMPLETO</th>
              <th scope='col'>ID PRESTAMO</th>
            </tr>
          </thead>
          <tbody>
            {clientsList?.map(({ ID_CLIENTE, DNI, NOMBRE_COMPLETO, ID_PRESTAMO }) => {
              return (
                <tr
                  key={ID_CLIENTE}
                  className='bg-accent-green h-12 cursor-pointer hover:bg-secondary border-b-2 border-secondary'
                  onClick={() => router.push(`/payments/search/${ID_CLIENTE}/${ID_PRESTAMO}`)}
                >
                  <th scope='row' className='text-center'>
                    {ID_CLIENTE}
                  </th>
                  <td className='text-center hidden md:table-cell text-xs md:text-base'>{DNI}</td>
                  <td className='text-center text-xs md:text-base'>{NOMBRE_COMPLETO}</td>
                  <td className='text-center text-xs md:text-base'>{ID_PRESTAMO}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <h3 className='italic text-2xl md:text-4xl w-full pt-8 text-center '>No records</h3>
      )}
    </section>
  )
}
