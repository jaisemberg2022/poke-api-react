// hooks/useName.ts
import { useContext } from 'react'
import NameContext from '../context/NameContext'

export const useName = () => {
  const context = useContext(NameContext)

  if (!context) {
    console.warn('useName debe usarse dentro de un NameProvider')
    return {
      name: '',
      setName: () => {},
      clearName: () => {},
    }
  }

  return context
}
