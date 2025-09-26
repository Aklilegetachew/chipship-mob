"use client"
import { useForm, Controller } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
import { getNames } from "country-list"
import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { useUserInfo } from "@/app/queries/user/user.query"

interface FormData {
  sender: {
    name: string
    phone: string
    address: string
    country: string
  }
  receiver: {
    name: string
    phone: string
    address: string
    country: string
  }
}

const countryOptions = getNames().map((name: string) => ({
  value: name,
  label: name,
}))

interface StepOneFormProps {
  initialData: FormData
  onNext: (data: FormData) => void
}

export default function StepOneForm({ initialData, onNext }: StepOneFormProps) {
  const { data: user } = useUserInfo()
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialData,
  })

  useEffect(() => {
    reset(initialData)
  }, [initialData, reset])

  const onSubmit = (data: FormData) => {
    onNext(data)
  }
  const [mounted, setMounted] = useState(false)
  const [senderIsMe, setSenderIsMe] = useState(false)
  const [receiverIsMe, setReceiverIsMe] = useState(false)
  useEffect(() => setMounted(true), [])

  const fillSender = (on: boolean) => {
    setSenderIsMe(on)
    setReceiverIsMe(false) // prevent both sections being "Me"
    if (on && user) {
      setValue("sender.name", user.name || "")
      setValue("sender.phone", user.phone || "")
      setValue("sender.address", user.address || "")
      setValue("sender.country", user.country || "")
    } else {
      setValue("sender.name", "")
      setValue("sender.phone", "")
      setValue("sender.address", "")
      setValue("sender.country", "")
    }
  }

  const fillReceiver = (on: boolean) => {
    setReceiverIsMe(on)
    setSenderIsMe(false) // prevent both sections being "Me"
    if (on && user) {
      setValue("receiver.name", user.name || "")
      setValue("receiver.phone", user.phone || "")
      setValue("receiver.address", user.address || "")
      setValue("receiver.country", user.country || "")
    } else {
      setValue("receiver.name", "")
      setValue("receiver.phone", "")
      setValue("receiver.address", "")
      setValue("receiver.country", "")
    }
  }

  if (!mounted) return null
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 pb-24">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Sender Details
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
              <input
                type="checkbox"
                checked={senderIsMe}
                onChange={(e) => fillSender(e.target.checked)}
                disabled={receiverIsMe}
                className="sr-only" // hide the native checkbox
              />
              <span
                className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border-2 ${
                  senderIsMe
                    ? "bg-teal-600 border-teal-600"
                    : "border-gray-300 bg-white"
                } transition-all duration-200`}
              >
                {senderIsMe && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              My Address
            </label>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 space-y-4 border border-slate-100">
            <Controller
              name="sender.name"
              control={control}
              rules={{ required: "Sender name is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter sender name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl p-3 sm:p-4 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  {errors.sender?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sender.name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="sender.phone"
              control={control}
              rules={{ required: "Sender phone is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    {...field}
                    country={"us"}
                    inputProps={{
                      name: "senderPhone",
                      required: true,
                      autoFocus: false,
                    }}
                    containerClass="w-full"
                    inputClass="!w-full !bg-slate-50 !text-slate-800 !border-slate-200 !rounded-xl !p-3 sm:!p-4 !text-base !h-auto"
                    buttonClass="!bg-slate-50 !border-slate-200 !rounded-l-xl"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  {errors.sender?.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sender.phone.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="sender.address"
              control={control}
              rules={{ required: "Sender address is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter sender address"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl p-3 sm:p-4 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  {errors.sender?.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sender.address.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="sender.country"
              control={control}
              rules={{ required: "Sender country is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country
                  </label>
                  <Select
                    {...field}
                    options={countryOptions}
                    className="text-slate-800"
                    classNamePrefix="select"
                    placeholder="Select sender country"
                    onChange={(val) => field.onChange(val?.value)}
                    value={
                      countryOptions.find(
                        (opt: any) => opt.value === field.value
                      ) || null
                    }
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.75rem",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        minHeight: "3rem",
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: "0.75rem",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }),
                    }}
                  />
                  {errors.sender?.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sender.country.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                Receiver Details
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
              <input
                type="checkbox"
                checked={receiverIsMe}
                onChange={(e) => fillReceiver(e.target.checked)}
                disabled={senderIsMe} // can't both be "Me"
                className="sr-only" // hide the native checkbox
              />
              <span
                className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border-2 ${
                  receiverIsMe
                    ? "bg-teal-600 border-teal-600"
                    : "border-gray-300 bg-white"
                } transition-all duration-200`}
              >
                {receiverIsMe && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
              My Address
            </label>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 border border-slate-100">
            <Controller
              name="receiver.name"
              control={control}
              rules={{ required: "Receiver name is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter receiver name"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl p-3 sm:p-4 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  {errors.receiver?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver.name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="receiver.phone"
              control={control}
              rules={{ required: "Receiver phone is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    {...field}
                    country={"us"}
                    inputProps={{
                      name: "receiverPhone",
                      required: true,
                      autoFocus: false,
                    }}
                    containerClass="w-full"
                    inputClass="!w-full !bg-slate-50 !text-slate-800 !border-slate-200 !rounded-xl !p-3 sm:!p-4 !text-base !h-auto"
                    buttonClass="!bg-slate-50 !border-slate-200 !rounded-l-xl"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  {errors.receiver?.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver.phone.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="receiver.address"
              control={control}
              rules={{ required: "Receiver address is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter receiver address"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl p-3 sm:p-4 text-base focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                  {errors.receiver?.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver.address.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="receiver.country"
              control={control}
              rules={{ required: "Receiver country is required" }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country
                  </label>
                  <Select
                    {...field}
                    options={countryOptions}
                    className="text-slate-800"
                    classNamePrefix="select"
                    placeholder="Select receiver country"
                    onChange={(val) => field.onChange(val?.value)}
                    value={
                      countryOptions.find(
                        (opt: any) => opt.value === field.value
                      ) || null
                    }
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.75rem",
                        padding: "0.5rem",
                        fontSize: "1rem",
                        minHeight: "3rem",
                      }),
                      menu: (base) => ({
                        ...base,
                        borderRadius: "0.75rem",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }),
                    }}
                  />
                  {errors.receiver?.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiver.country.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </form>
      </div>

      <div className="sticky bottom-20 left-0 right-0 bg-white border-t border-slate-200 p-4 sm:p-6 shadow-lg safe-area-inset-bottom mb-20 md:mb-0">
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg py-4 text-base font-semibold rounded-2xl transition-all duration-200 active:scale-95"
          onClick={handleSubmit(onSubmit)}
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Continue to Products
        </Button>
      </div>
    </div>
  )
}
