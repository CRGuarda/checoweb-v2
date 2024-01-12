import { getLocalDate } from '@/utils/get-local-date'
import { useEffect, useState } from 'react'

export const useFormatDate = (date: string | Date) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    setFormattedDate(getLocalDate(date))
  }, [date])

  return { formattedDate }
}
