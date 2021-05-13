import { useCallback, useState } from 'react'

export const useList = (initialValue) => {
  const [list, setList] = useState(initialValue)
  const set = useCallback((ls) => setList(ls), [])
  const add = (item) => { setList([...list, item]) }
  const update = (updatedItem) => {
    setList(list.map(item => (
      item.id === updatedItem.id ? updatedItem : item
    )))
  }
  const remove = (id) => {
    setList(list.filter(item => item.id !== id))
  }
  return { data: list, set, add, update, remove }
}
