"use client";

import React, { useState } from "react";
import {
  useFormContext,
  Controller,
  FieldError,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export interface RHFInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
  labelRight?: React.ReactNode;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
  control?: any;
  register?: any;
  customError?: string;
  containerClassName?: string;
}

export function RHFInput({
  name,
  label,
  labelRight,
  helperText,
  required = false,
  type = "text",
  placeholder,
  disabled,
  className = "",
  containerClassName = "",
  icon,
  control,
  register,
  customError,
  ...rest
}: RHFInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const renderInput = (
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

          <Input
            id={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            className={`h-10 w-full rounded-lg text-sm font-sans transition-all duration-200 ${
              icon ? "pl-10" : "px-3.5"
            } ${isPassword ? "pr-10" : ""} ${
              errorMessage
                ? "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
                : "border-slate-200 dark:border-slate-800 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
            } ${className}`}
            {...fieldProps}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
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
          return renderInput(
            {
              ...field,
              value: field.value ?? "",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                if (type === "number") {
                  const val = e.target.value === "" ? "" : Number(e.target.value);
                  field.onChange(val);
                } else {
                  field.onChange(e);
                }
              },
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

  return renderInput(registeredProps, errorMessage);
}
