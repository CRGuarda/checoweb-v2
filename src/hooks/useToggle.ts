'use client'
import { useState } from 'react'

export const useToggle = () => {
  const [keyForOpen, setKeyForOpen] = useState('')

  const setKey = (key: string) => {
    setKeyForOpen((currKey) => (currKey !== key ? key : ''))
  }

  const isMatchedKey = (key: string) => key === keyForOpen

  return { isMatchedKey, setKey }
}
