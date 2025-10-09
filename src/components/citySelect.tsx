"use client"

import AsyncSelect from "react-select/async"
import { useCallback, useRef } from "react"

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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const loadOptions = useCallback(
    (inputValue: string, callback: (options: CityOption[]) => void) => {
      // Clear previous timeout and abort previous request
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (controllerRef.current) {
        controllerRef.current.abort()
      }

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        if (!inputValue || inputValue.length < 2) {
          callback([])
          return
        }

        try {
          controllerRef.current = new AbortController()
          const data = await searchCities(inputValue)
          const options = (data ?? []).map((city: string) => ({
            label: city,
            value: city,
          }))
          callback(options)
        } catch (error: any) {
          if (error.name !== "AbortError") {
            console.error("Error fetching cities:", error)
            callback([])
          }
        }
      }, 500) // Wait 500ms after user stops typing
    },
    []
  )

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={(option) => onChange(option?.value || "")}
      value={value ? { label: value, value } : null}
      placeholder={placeholder || "Type a city name (min 2 chars)..."}
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
