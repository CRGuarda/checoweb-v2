'use client'
import { useInputText } from '@/hooks/useInputText'
import { ChangeEvent, FormEvent, useState } from 'react'

export const ClientSearch = () => {
  const [clientsList, setClientsList] = useState([])
  const { handleInput, inputForSearch, inputSearchId } = useInputText()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      const clientsRequest = await fetch(`/api/clients/${inputForSearch}`)
      if (!clientsRequest.ok) return setClientsList([])
      const clientsResponse = await clientsRequest.json()
      setClientsList(clientsResponse)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.validity.valid && e.target.value.length <= 8 && handleInput(e.target.value)
  }

  return (
    <section className='flex flex-col'>
      <label htmlFor={inputSearchId}>Ingrese DNI para búsqueda</label>
      <form className='flex flex-col md:flex-row gap-2 md:gap-4 w-max' onSubmit={handleSubmit}>
        <input
          type='text'
          id={inputSearchId}
          value={inputForSearch}
          onChange={handleInputChange}
          placeholder='04539343'
          pattern='^[0-9]+$'
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
      {clientsList.length ? (
        <table className=' bg-red-300 p-5 rounded-lg'>
          <thead>
            <tr>
              <th scope='col'>DNI</th>
              <th scope='col'>NOMBRE COMPLETO</th>
              <th scope='col'>SEXO</th>
              <th scope='col'>EDAD</th>
              <th scope='col'>ESTADO CIVIL</th>
              <th scope='col'>DEPARTAMENTO</th>
              <th scope='col'>CELULAR</th>
              <th scope='col'>CORREO</th>
              <th scope='col'>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {clientsList?.map(
              ({
                ID_CLIENTE,
                DNI,
                NOMBRE_COMPLETO,
                SEXO,
                EDAD,
                ESTADO_CIVIL,
                DEPARTAMENTO,
                CELULAR,
                CORREO,
                ESTADO,
              }) => {
                return (
                  <tr key={ID_CLIENTE || DNI} className=' bg-violet-400 p-4'>
                    <th scope='row' className='text-center'>
                      {DNI}
                    </th>
                    <td className='text-center'>{NOMBRE_COMPLETO}</td>
                    <td className='text-center'>{SEXO}</td>
                    <td className='text-center'>{EDAD}</td>
                    <td className='text-center'>{ESTADO_CIVIL}</td>
                    <td className='text-center'>{DEPARTAMENTO}</td>
                    <td className='text-center'>{CELULAR}</td>
                    <td className='text-center'>{CORREO}</td>
                    <td className='text-center'>{ESTADO}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      ) : (
        <h3 className='italic text-2xl md:text-4xl w-full pt-8 text-center '>No records</h3>
      )}
    </section>
  )
}
