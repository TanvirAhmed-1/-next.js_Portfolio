"use client";

import React from "react";
import {
  useFormContext,
  Controller,
  Control,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface RHFTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  control?: any;
  register?: any;
  customError?: string;
  containerClassName?: string;
}

export function RHFTextArea({
  name,
  label,
  helperText,
  required = false,
  placeholder,
  rows = 4,
  disabled,
  className = "",
  containerClassName = "",
  control,
  register,
  customError,
  ...rest
}: RHFTextAreaProps) {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  const renderTextArea = (
    fieldProps: any = {},
    errorMessage?: string
  ) => {
    return (
      <div className={`space-y-1.5 w-full ${containerClassName}`}>
        {label && (
          <Label
            htmlFor={name}
            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </span>
          </Label>
        )}

        <Textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full transition-all duration-200 resize-y ${
            errorMessage
              ? "border-destructive focus-visible:ring-destructive/30"
              : "border-input focus-visible:ring-primary/40"
          } ${className}`}
          {...fieldProps}
          {...rest}
        />

        {errorMessage && (
          <p className="text-xs text-destructive font-medium flex items-center gap-1">
            {errorMessage}
          </p>
        )}

        {!errorMessage && helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  };

  if (effectiveControl) {
    return (
      <Controller
        name={name}
        control={effectiveControl}
        render={({ field, fieldState: { error } }) => {
          const errorMessage = customError || error?.message;
          return renderTextArea(
            {
              ...field,
              value: field.value ?? "",
            },
            errorMessage
          );
        }}
      />
    );
  }

  const regFn = register || formContext?.register;
  const registeredProps = regFn ? regFn(name) : {};
  const contextError = formContext?.formState?.errors?.[name] as FieldError | undefined;
  const errorMessage = customError || contextError?.message;

  return renderTextArea(registeredProps, errorMessage);
}
