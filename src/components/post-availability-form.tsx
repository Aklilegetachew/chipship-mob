"use client"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import { getNames } from "country-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plane, Luggage, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import CitySelect from "./citySelect"

interface PostAvailabilityFormProps {
  onBack?: () => void
  onSubmit?: (data: FormData) => void
}

interface FormData {
  startingDate: string
  reachingDate: string
  startingLocation: string
  reachingLocation: string
  luggageType: string
  luggageSize: string
  cost: string
  deadline: string
}

const countryOptions = getNames().map((name: string) => ({
  value: name,
  label: name,
}))

const luggageTypeOptions = [
  { value: "carry-on", label: "Carry-on" },
  { value: "checked", label: "Checked Baggage" },
  { value: "personal", label: "Personal Item" },
  { value: "oversized", label: "Oversized" },
]

export function PostAvailabilityForm({
  onBack,
  onSubmit,
}: PostAvailabilityFormProps) {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      startingDate: "",
      reachingDate: "",
      startingLocation: "",
      reachingLocation: "",
      luggageType: "",
      luggageSize: "",
      cost: "",
      deadline: "",
    },
  })

  const startingDate = watch("startingDate")

  const onFormSubmit = (data: FormData) => {
    if (onSubmit) {
      onSubmit(data)
    } else {
      console.log("Form submitted:", data)
    }
  }

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-balance">
            Post Availability
          </h1>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 pb-8">
        <p className="text-muted-foreground text-center mb-8 md:mb-12 text-pretty text-base md:text-lg">
          Share your flight details and available luggage space.
        </p>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-8 md:space-y-10"
        >
          {/* Flight Info Section */}
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold">Flight Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Controller
                name="startingDate"
                control={control}
                rules={{
                  required: "Starting date is required",
                  validate: (value) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    const selectedDate = new Date(value)
                    return (
                      selectedDate >= today ||
                      "Starting date cannot be in the past"
                    )
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="startingDate"
                      className="text-muted-foreground font-normal"
                    >
                      Starting Date
                    </Label>
                    <Input
                      {...field}
                      id="startingDate"
                      type="date"
                      className="w-full"
                    />
                    {errors.startingDate && (
                      <p className="text-red-500 text-sm">
                        {errors.startingDate.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="reachingDate"
                control={control}
                rules={{
                  required: "Reaching date is required",
                  validate: (value) => {
                    if (!startingDate) return true
                    const start = new Date(startingDate)
                    const reach = new Date(value)
                    return (
                      reach >= start ||
                      "Reaching date must be on or after starting date"
                    )
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="reachingDate"
                      className="text-muted-foreground font-normal"
                    >
                      Reaching Date
                    </Label>
                    <Input
                      {...field}
                      id="reachingDate"
                      type="date"
                      className="w-full"
                      min={startingDate || undefined}
                    />
                    {errors.reachingDate && (
                      <p className="text-red-500 text-sm">
                        {errors.reachingDate.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="startingLocation"
                control={control}
                rules={{ required: "Starting location is required" }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="startingLocation"
                      className="text-muted-foreground font-normal"
                    >
                      Starting Location
                    </Label>
                    <CitySelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search starting city..."
                    />
                    {errors.startingLocation && (
                      <p className="text-red-500 text-sm">
                        {errors.startingLocation.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="reachingLocation"
                control={control}
                rules={{ required: "Reaching location is required" }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="reachingLocation"
                      className="text-muted-foreground font-normal"
                    >
                      Reaching Location
                    </Label>
                    <CitySelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search destination city..."
                    />
                    {errors.reachingLocation && (
                      <p className="text-red-500 text-sm">
                        {errors.reachingLocation.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Luggage Info Section */}
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Luggage className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold">Luggage Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Controller
                name="luggageType"
                control={control}
                rules={{ required: "Luggage type is required" }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="luggageType"
                      className="text-muted-foreground font-normal"
                    >
                      Luggage Type
                    </Label>
                    <Select
                      {...field}
                      options={luggageTypeOptions}
                      className="text-foreground"
                      classNamePrefix="select"
                      placeholder="Select luggage type..."
                      onChange={(val) => field.onChange(val?.value || "")}
                      value={
                        luggageTypeOptions.find(
                          (opt) => opt.value === field.value
                        ) || null
                      }
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
                          "&:hover": {
                            borderColor: "hsl(var(--border))",
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused
                            ? "hsl(var(--accent))"
                            : "hsl(var(--background))",
                          color: "hsl(var(--foreground))",
                          cursor: "pointer",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "hsl(var(--foreground))",
                        }),
                        input: (base) => ({
                          ...base,
                          color: "hsl(var(--foreground))",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "hsl(var(--muted-foreground))",
                        }),
                      }}
                    />
                    {errors.luggageType && (
                      <p className="text-red-500 text-sm">
                        {errors.luggageType.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="luggageSize"
                control={control}
                rules={{
                  required: "Luggage size is required",
                  min: {
                    value: 0.1,
                    message: "Luggage size must be greater than 0",
                  },
                  max: {
                    value: 100,
                    message: "Luggage size cannot exceed 100 kg",
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="luggageSize"
                      className="text-muted-foreground font-normal"
                    >
                      Luggage Size (in kilos)
                    </Label>
                    <Input
                      {...field}
                      id="luggageSize"
                      type="number"
                      placeholder="e.g., 23"
                      className="w-full"
                      min="0"
                      step="0.1"
                    />
                    {errors.luggageSize && (
                      <p className="text-red-500 text-sm">
                        {errors.luggageSize.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Offer Info Section */}
          <section className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-600 rounded-lg">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold">Offer Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Controller
                name="cost"
                control={control}
                rules={{
                  required: "Cost is required",
                  min: { value: 0, message: "Cost cannot be negative" },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="cost"
                      className="text-muted-foreground font-normal"
                    >
                      Cost for Taking Luggage ($)
                    </Label>
                    <Input
                      {...field}
                      id="cost"
                      type="number"
                      placeholder="e.g., 50"
                      className="w-full"
                      min="0"
                      step="0.01"
                    />
                    {errors.cost && (
                      <p className="text-red-500 text-sm">
                        {errors.cost.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="deadline"
                control={control}
                rules={{
                  required: "Deadline is required",
                  validate: (value) => {
                    if (!startingDate) return true
                    const deadline = new Date(value)
                    const start = new Date(startingDate)
                    return (
                      deadline <= start ||
                      "Deadline must be on or before starting date"
                    )
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label
                      htmlFor="deadline"
                      className="text-muted-foreground font-normal"
                    >
                      Deadline for Accepting Pickup
                    </Label>
                    <Input
                      {...field}
                      id="deadline"
                      type="date"
                      className="w-full"
                      max={startingDate || undefined}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 text-sm">
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center md:justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto md:min-w-[200px] bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-medium"
              size="lg"
            >
              Post
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
