import { useId, useState } from 'react'

export const useInputText = () => {
  const [inputForSearch, setInputForSearch] = useState('')
  const inputSearchId = useId()

  const handleInput = (inputText: string) => setInputForSearch(inputText)
  return { inputForSearch, handleInput, inputSearchId }
}
