"use client"

import AsyncSelect from "react-select/async"
import { useCallback } from "react"
import { useDebounce } from "use-debounce"

import { useCitySearch } from "@/app/queries/other/other.query"
import { searchCities } from "@/app/queries/other/other.api"

interface CityOption {
  label: string
  value: string
}

interface CitySelectProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function CitySelect({
  value,
  onChange,
  placeholder,
}: CitySelectProps) {
  const [debouncedInput, setDebouncedInput] = useDebounce("", 100)

  const loadOptions = useCallback(
    async (inputValue: string): Promise<CityOption[]> => {
      console.log("debouncedInput", inputValue)
      //   setDebouncedInput(inputValue)
      if (!inputValue) return []

      //   const { data } = await useCitySearch(inputValue)
      const data = await searchCities(inputValue)
      console.log("data", data)
      return (data ?? []).map((city: any) => ({ label: city, value: city }))
    },
    []
  )

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions as any}
      onChange={(option) => onChange(option?.value || "")}
      value={value ? { label: value, value } : null}
      placeholder={placeholder || "Type a city name..."}
      isClearable
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "hsl(var(--background))",
          border: state.isFocused
            ? "2px solid hsl(var(--ring))"
            : "1px solid hsl(var(--border))",
          borderRadius: "0.5rem",
          padding: "0.25rem",
          fontSize: "0.875rem",
          minHeight: "2.5rem",
          boxShadow: "none",
        }),
        menu: (base) => ({
          ...base,
          zIndex: 100,
        }),
      }}
    />
  )
}
