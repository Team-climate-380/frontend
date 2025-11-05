import { Input as MantineInput } from '@mantine/core'
import style from './style.module.css'
import React, { useState } from 'react'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { SearchIcon } from '@/shared/ui/icons/search'

export const SearchInput = () => {
  const { setSearch, getDecodedSearch } = useQueryParams()
  const initialSearch = getDecodedSearch()
  const [isInputVisible, setIsInputVisible] = useState(initialSearch ? true : false)
  const [inputValue, setInputValue] = useState(initialSearch)

  const handleClickIconSearch = () => {
    if (isInputVisible) {
      setSearch(inputValue)
    } else {
      setIsInputVisible(true)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }

  const handleClear = () => {
    setInputValue('')
    setIsInputVisible(false)
    setSearch('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setSearch(inputValue)
      setIsInputVisible(!!inputValue)
    }
  }

  return (
    <>
      {isInputVisible && (
        <MantineInput
          className={style.search_input}
          variant="filled"
          size="sm"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rightSection={inputValue !== '' ? <MantineInput.ClearButton onClick={handleClear} /> : undefined}
          rightSectionPointerEvents="auto"
        />
      )}
      <SearchIcon className={style.search_icon} onClick={handleClickIconSearch} />
    </>
  )
}
