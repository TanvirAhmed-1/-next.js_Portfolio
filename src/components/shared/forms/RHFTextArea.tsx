"use client";

import React from "react";
import {
  useFormContext,
  Controller,
  FieldError,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface RHFTextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: string;
  label?: string;
  labelRight?: React.ReactNode;
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
  labelRight,
  helperText,
  required = false,
  placeholder,
  rows = 3,
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

        <Textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg text-sm font-sans transition-all duration-200 resize-y no-scrollbar ${
            errorMessage
              ? "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
              : "border-slate-200 dark:border-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
          } ${className}`}
          {...fieldProps}
          {...rest}
        />

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
