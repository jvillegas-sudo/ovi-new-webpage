"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, Select, Text, Textarea } from "@components/ui";

const sectorOptions = [
  { label: "Manufactura e Industria", value: "manufactura-industria" },
  { label: "Construcción y Obra", value: "construccion-obra" },
  { label: "Transporte y Logística", value: "transporte-logistica" },
  { label: "Infraestructura Pública", value: "infraestructura-publica" },
  { label: "Salud y Saneamiento", value: "salud-saneamiento" },
  { label: "Comercio e Inmobiliario", value: "comercio-inmobiliario" },
  { label: "Otro", value: "otro" },
] as const;

const contactFormSchema = z.object({
  name: z.string().min(2, "Por favor ingrese su nombre completo."),
  email: z.string().email("Por favor ingrese un correo electrónico válido."),
  company: z.string().min(2, "Por favor ingrese el nombre de su empresa."),
  industry: z.string().min(1, "Por favor seleccione su sector."),
  message: z
    .string()
    .min(20, "Por favor escriba al menos 20 caracteres para que podamos entender su necesidad."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface ContactFormPrefill {
  industry?: string;
  message?: string;
}

export function ContactForm({ prefill }: { prefill?: ContactFormPrefill }) {
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
      industry: prefill?.industry ?? "",
      message: prefill?.message ?? "",
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
          Mensaje recibido
        </Text>
        <Text className="mt-3">
          Gracias por contactar a OVI. Nuestro equipo revisará su consulta y le responderá con el
          especialista indicado a la brevedad posible.
        </Text>
        <button
          type="button"
          onClick={() => {
            reset();
            setIsSuccess(false);
          }}
          className="mt-6 text-sm font-medium text-[var(--color-brand-primary)] transition-colors hover:text-white"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Nombre"
          placeholder="Su nombre completo"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="usted@empresa.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Empresa"
          placeholder="Nombre de la empresa"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <Select
          label="Sector"
          placeholder="Seleccione un sector"
          options={[...sectorOptions]}
          error={errors.industry?.message}
          defaultValue=""
          {...register("industry")}
        />
      </div>

      <Textarea
        label="Mensaje"
        placeholder="Cuéntenos sobre sus necesidades operativas, retos técnicos o prioridades ambientales."
        rows={6}
        autoResize
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" size="lg" loading={isSubmitting}>
        Enviar Mensaje
      </Button>
    </form>
  );
}
