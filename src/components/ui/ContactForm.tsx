"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Select, Text, Textarea } from "@components/ui";

const industryOptions = [
  { label: "Food & Beverage", value: "food-beverage" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Manufacturing & Industrial", value: "manufacturing-industrial" },
  { label: "Oil & Gas", value: "oil-gas" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Other", value: "other" },
] as const;

const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Please enter your company name."),
  industry: z.string().min(1, "Please select your industry."),
  message: z
    .string()
    .min(20, "Please provide at least 20 characters so we can understand your needs."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      industry: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1500);
    });

    reset(values);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="glass rounded-2xl border border-[var(--color-border-default)] p-8 text-center sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,255,133,0.12)]">
          <CheckCircle2 className="h-8 w-8 text-[var(--color-brand-accent)]" />
        </div>
        <Text as="p" size="xl" weight="semibold" textColor="primary" className="mt-6">
          Message received
        </Text>
        <Text className="mt-3">
          Thank you for reaching out to OVI Ventures. Our team will review your inquiry and respond
          with the right technical expert shortly.
        </Text>
        <button
          type="button"
          onClick={() => {
            reset();
            setIsSuccess(false);
          }}
          className="mt-6 text-sm font-medium text-[var(--color-brand-primary)] transition-colors hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Name"
          placeholder="Your full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Company"
          placeholder="Company name"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <Select
          label="Industry"
          placeholder="Select an industry"
          options={[...industryOptions]}
          error={errors.industry?.message}
          defaultValue=""
          {...register("industry")}
        />
      </div>

      <Textarea
        label="Message"
        placeholder="Tell us about your operational goals, technical challenges, or sustainability targets."
        rows={6}
        autoResize
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" size="lg" loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
