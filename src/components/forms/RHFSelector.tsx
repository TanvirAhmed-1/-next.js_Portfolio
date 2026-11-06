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
import { ChevronDown } from "lucide-react";

export interface SelectorOption {
  label: string;
  value: string | number;
}

export interface RHFSelectorProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  options: (SelectorOption | string)[];
  placeholder?: string;
  control?: any;
  register?: any;
  customError?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
}

export function RHFSelector({
  name,
  label,
  helperText,
  required = false,
  options,
  placeholder,
  disabled,
  className = "",
  containerClassName = "",
  icon,
  control,
  register,
  customError,
  ...rest
}: RHFSelectorProps) {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  const normalizedOptions: SelectorOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const renderSelect = (
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

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-muted-foreground pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}

          <select
            id={name}
            disabled={disabled}
            className={`w-full appearance-none rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 pr-9 ${
              icon ? "pl-9" : ""
            } ${
              errorMessage
                ? "border-destructive focus:ring-destructive/30"
                : "border-input focus:ring-primary/40 focus:border-primary"
            } ${className}`}
            {...fieldProps}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {normalizedOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-popover text-popover-foreground">
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

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
          return renderSelect(
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

  return renderSelect(registeredProps, errorMessage);
}
