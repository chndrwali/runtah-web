"use client";

import { useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn, getPasswordRules, getPasswordStrength } from "@/lib/utils";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  showStrength?: boolean;
  showRules?: boolean;
}

export const PasswordInput = ({
  className,
  showToggle = true,
  showStrength = false,
  showRules = false,
  value = "",
  onChange,
  ...props
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [focused, setFocused] = useState(false);

  const strengthLabelMap: Record<string, string> = {
    Weak: "Lemah",
    Medium: "Sedang",
    Strong: "Kuat",
    "Very Strong": "Sangat Kuat",
  };

  const strength =
    showStrength && typeof value === "string"
      ? getPasswordStrength(value)
      : null;

  const rules =
    showRules && typeof value === "string" ? getPasswordRules(value) : null;

  return (
    <div className="space-y-1">
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          className={cn(showToggle && "pr-10", className)}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          onKeyUp={(e) => {
            setCapsLock(e.getModifierState("CapsLock"));
          }}
        />

        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {capsLock && (
        <div className="flex items-center gap-1 text-xs text-yellow-600">
          <AlertTriangle className="h-3 w-3" />
          Caps Lock is on
        </div>
      )}

      {rules && focused && (
        <ul className="space-y-1 mt-2">
          <RuleItem valid={rules.minLength} text="Minimal 8 karakter" />
          <RuleItem
            valid={rules.uppercase}
            text="Mengandung huruf kapital (A–Z)"
          />
          <RuleItem valid={rules.number} text="Mengandung angka (0–9)" />
          <RuleItem
            valid={rules.specialChar}
            text="Mengandung karakter spesial (!@# dll)"
          />
        </ul>
      )}

      {strength && value && (
        <div className="space-y-1 mt-2">
          <div className="h-1 w-full rounded bg-muted overflow-hidden">
            <div
              className={cn("h-full transition-all", strength.color)}
              style={{ width: `${(strength.score / 4) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Kekuatan kata sandi:{" "}
            <span className="font-medium">
              {strengthLabelMap[strength.label] || strength.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const RuleItem = ({ valid, text }: { valid: boolean; text: string }) => (
  <li
    className={cn(
      "flex items-center gap-2 text-xs",
      valid ? "text-green-600" : "text-muted-foreground",
    )}
  >
    <span>{valid ? "✔" : "•"}</span>
    {text}
  </li>
);
