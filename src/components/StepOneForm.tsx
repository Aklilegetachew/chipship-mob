import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { getNames } from "country-list";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";


interface FormData {
    sender: {
        name: string;
        phone: string;
        address: string;
        country: string;
    };
    receiver: {
        name: string;
        phone: string;
        address: string;
        country: string;
    };
}

const countryOptions = getNames().map((name: string) => ({
    value: name,
    label: name,
}));

interface StepOneFormProps {
    onNext: (data: FormData) => void;
}

export default function StepOneForm({ onNext }: StepOneFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            sender: { name: "", phone: "", address: "", country: "" },
            receiver: { name: "", phone: "", address: "", country: "" },
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
            {/* Sender */}
            <h2 className="text-xl font-bold text-text-dark mb-4">Sender details</h2>
            <div className="bg-card-light rounded-2xl shadow-md p-6 mb-6 space-y-4">
                <Controller
                    name="sender.name"
                    control={control}
                    rules={{ required: "Sender name is required" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Enter sender name"
                            className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray rounded-md p-2 w-full"
                        />
                    )}
                />
                <Controller
                    name="sender.phone"
                    control={control}
                    rules={{ required: "Sender phone is required" }}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            country={"us"}
                            inputProps={{
                                name: "senderPhone",
                                required: true,
                                autoFocus: false,
                            }}
                            containerClass="w-full"
                            inputClass="w-full bg-input-light text-text-dark"
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />
                <Controller
                    name="sender.address"
                    control={control}
                    rules={{ required: "Sender address is required" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Enter sender address"
                            className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray rounded-md p-2 w-full"
                        />
                    )}
                />
                <Controller
                    name="sender.country"
                    control={control}
                    rules={{ required: "Sender country is required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={countryOptions}
                            className="text-text-dark"
                            classNamePrefix="select"
                            placeholder="Select sender country"
                            onChange={(val) => field.onChange(val?.value)}
                            value={countryOptions.find((opt: any) => opt.value === field.value) || null}
                            isClearable
                        />
                    )}
                />
            </div>

            {/* Receiver */}
            <h2 className="text-xl font-bold text-text-dark mb-4">Receiver details</h2>
            <div className="bg-card-light rounded-2xl shadow-md p-6 mb-6 space-y-4">
                <Controller
                    name="receiver.name"
                    control={control}
                    rules={{ required: "Receiver name is required" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Enter receiver name"
                            className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray rounded-md p-2 w-full"
                        />
                    )}
                />
                <Controller
                    name="receiver.phone"
                    control={control}
                    rules={{ required: "Receiver phone is required" }}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            country={"us"}
                            inputProps={{
                                name: "receiverPhone",
                                required: true,
                                autoFocus: false,
                            }}
                            containerClass="w-full"
                            inputClass="w-full bg-input-light text-text-dark"
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />
                <Controller
                    name="receiver.address"
                    control={control}
                    rules={{ required: "Receiver address is required" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            placeholder="Enter receiver address"
                            className="bg-input-light border-none text-text-dark placeholder:text-text-light-gray rounded-md p-2 w-full"
                        />
                    )}
                />
                <Controller
                    name="receiver.country"
                    control={control}
                    rules={{ required: "Receiver country is required" }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={countryOptions}
                            className="text-text-dark"
                            classNamePrefix="select"
                            placeholder="Select receiver country"
                            onChange={(val) => field.onChange(val?.value)}
                            value={countryOptions.find((opt: any) => opt.value === field.value) || null}
                            isClearable
                        />
                    )}
                />
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-end items-center bg-card-light rounded-t-2xl p-4 mt-auto shadow-lg">

                <Button
                    type="submit"
                    size="lg"
                    className="!bg-teal-600 text-primary-foreground hover:bg-teal-600/90"
                >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Process Next
                </Button>


            </div>
        </form>
    );
}
