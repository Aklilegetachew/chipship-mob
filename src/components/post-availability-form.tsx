"use client"
import { useForm, Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plane, Luggage, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import CitySelect from "./citySelect"
import { useCreateTravelerRoute } from "@/app/queries/traveler/travel.query"
import { useToast } from "@/context/ToastContext"

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

const countryOptions = [
  { value: "AF", label: "Afghanistan" },
  { value: "AL", label: "Albania" },
  { value: "DZ", label: "Algeria" },
  // ... other country options ...
]

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

  const { mutateAsync, status } = useCreateTravelerRoute()
  const isLoading = status === "pending"
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
  const { showSuccess, showError } = useToast()
  const startingDate = watch("startingDate")

  // ✅ submit handler
  const onFormSubmit = async (data: FormData) => {
    try {
   
        await mutateAsync({
          fromLocation: data.startingLocation,
          toLocation: data.reachingLocation,
          departureDate: data.startingDate,
          arrivalDate: data.reachingDate,
          availableSpace: parseFloat(data.luggageSize),
          pricePerKg: parseFloat(data.cost),
        })
        showSuccess("Traveler route posted successfully!")
        router.push("/traveler/routes") // navigate to routes list or dashboard
    } catch (error: any) {
      console.error("Error posting traveler route:", error)
      showError(error?.message || "Failed to post traveler route")
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
    <div className="">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-3 md:px-6 lg:px-8 py-3 md:py-4 flex items-center gap-3 md:gap-4">
          <button
            onClick={handleBack}
            className="p-2.5 md:p-2 -ml-1 md:-ml-2 hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 md:w-6 md:h-6" />
          </button>
          <h1 className="text-lg md:text-2xl font-semibold text-balance">
            Post Availability
          </h1>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-5xl mx-auto px-0 md:px-6 lg:px-8 py-4 md:py-12 pb-32 md:pb-32">
        <p className="text-muted-foreground text-center mb-6 md:mb-14 text-pretty text-sm md:text-lg max-w-2xl mx-auto px-4 md:px-0">
          Share your flight details and available luggage space.
        </p>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-4 md:space-y-12"
        >
          {/* Flight Info Section */}
          <section className="space-y-5 md:space-y-6 p-4 md:p-8 bg-card rounded-none md:rounded-xl border-y md:border border-border shadow-none md:shadow-sm md:hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-1 md:mb-2">
              <div className="p-2 md:p-2.5 bg-teal-600 rounded-lg shadow-sm">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base md:text-xl font-semibold">
                Flight Info
              </h2>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="startingDate"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Starting Date
                    </Label>
                    <Input
                      {...field}
                      id="startingDate"
                      type="date"
                      className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50"
                    />
                    {errors.startingDate && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="reachingDate"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Reaching Date
                    </Label>
                    <Input
                      {...field}
                      id="reachingDate"
                      type="date"
                      className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50"
                      min={startingDate || undefined}
                    />
                    {errors.reachingDate && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="startingLocation"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Starting Location
                    </Label>
                    <CitySelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search starting city..."
                    />
                    {errors.startingLocation && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="reachingLocation"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Reaching Location
                    </Label>
                    <CitySelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Search destination city..."
                    />
                    {errors.reachingLocation && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {errors.reachingLocation.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Luggage Info Section */}
          <section className="space-y-5 md:space-y-6 p-4 md:p-8 bg-card rounded-none md:rounded-xl border-y md:border border-border shadow-none md:shadow-sm md:hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-1 md:mb-2">
              <div className="p-2 md:p-2.5 bg-teal-600 rounded-lg shadow-sm">
                <Luggage className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base md:text-xl font-semibold">
                Luggage Info
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Controller
                name="luggageType"
                control={control}
                rules={{ required: "Luggage type is required" }}
                render={({ field }) => (
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="luggageType"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Luggage Type
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50">
                        <SelectValue placeholder="Select luggage type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {luggageTypeOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-base md:text-sm"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.luggageType && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="luggageSize"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Luggage Size (in kilos)
                    </Label>
                    <Input
                      {...field}
                      id="luggageSize"
                      type="number"
                      placeholder="e.g., 23"
                      className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50"
                      min="0"
                      step="0.1"
                    />
                    {errors.luggageSize && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {errors.luggageSize.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Offer Info Section */}
          <section className="space-y-5 md:space-y-6 p-4 md:p-8 bg-card rounded-none md:rounded-xl border-y md:border border-border shadow-none md:shadow-sm md:hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-1 md:mb-2">
              <div className="p-2 md:p-2.5 bg-teal-600 rounded-lg shadow-sm">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-base md:text-xl font-semibold">Offer Info</h2>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="cost"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Cost for Taking Luggage ($)
                    </Label>
                    <Input
                      {...field}
                      id="cost"
                      type="number"
                      placeholder="e.g., 50"
                      className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50"
                      min="0"
                      step="0.01"
                    />
                    {errors.cost && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
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
                  <div className="space-y-2 md:space-y-2.5">
                    <Label
                      htmlFor="deadline"
                      className="text-sm md:text-sm font-medium text-foreground"
                    >
                      Deadline for Accepting Pickup
                    </Label>
                    <Input
                      {...field}
                      id="deadline"
                      type="date"
                      className="w-full h-12 md:h-11 text-base md:text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-600/20 hover:border-teal-600/50"
                      max={startingDate || undefined}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 text-xs md:text-sm flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                        {errors.deadline.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end md:justify-end pt-4 mb-8 mr-2">
            <Button
              type="submit"
              className="w-[200px] md:w-auto md:min-w-[200px] bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
              disabled={isLoading} // disable while loading
            >
              {isLoading ? "Posting..." : "Post Availability"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
