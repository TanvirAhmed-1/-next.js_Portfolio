"use client";

import React from "react";
import {
  useFormContext,
  Controller,
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
  labelRight?: React.ReactNode;
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
  labelRight,
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
        {(label || labelRight) && (
          <div className="flex items-center justify-between h-5">
            {label ? (
              <Label
                htmlFor={name}
                className="font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1 leading-none"
              >
                <span>{label}</span>
                {required && <span className="text-rose-500">*</span>}
              </Label>
            ) : (
              <span />
            )}
            {labelRight && <div className="flex items-center">{labelRight}</div>}
          </div>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}

          <select
            id={name}
            disabled={disabled}
            className={`h-10 w-full appearance-none rounded-lg border bg-white dark:bg-slate-900/90 px-3.5 text-sm font-sans text-slate-900 dark:text-slate-100 shadow-2xs transition-all duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 pr-9 ${
              icon ? "pl-10" : ""
            } ${
              errorMessage
                ? "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                : "border-slate-200 dark:border-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
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
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
            {errorMessage}
          </p>
        )}

        {!errorMessage && helperText && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
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
