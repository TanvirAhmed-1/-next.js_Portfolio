"use client";

import React, { useState } from "react";
import {
  useFormContext,
  Controller,
  Control,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export interface RHFInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label?: string;
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

          <Input
            id={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full transition-all duration-200 ${
              icon ? "pl-9" : ""
            } ${isPassword ? "pr-10" : ""} ${
              errorMessage
                ? "border-destructive focus-visible:ring-destructive/30"
                : "border-input focus-visible:ring-primary/40"
            } ${className}`}
            {...fieldProps}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
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

  // If controller is available, use Controller for reactive binding & errors
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

  // Fallback: If register function was supplied or from context
  const regFn = register || formContext?.register;
  const registeredProps = regFn ? regFn(name) : {};
  const contextError = formContext?.formState?.errors?.[name] as FieldError | undefined;
  const errorMessage = customError || contextError?.message;

  return renderInput(registeredProps, errorMessage);
}
