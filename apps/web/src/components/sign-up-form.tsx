import {
  ArrowRight01Icon,
  LockIcon,
  Mail01Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const variety = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  const strength =
    password.length < 6
      ? { level: 1, label: "Weak" }
      : password.length < 10 || variety < 3
        ? { level: 2, label: "Fair" }
        : { level: 3, label: "Strong" };

  const colors = ["", "bg-destructive", "bg-primary", "bg-chart-4"];
  const textColors = ["", "text-destructive", "text-primary", "text-chart-4"];

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i <= strength.level ? colors[strength.level] : "bg-border"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${textColors[strength.level]}`}>{strength.label}</span>
    </div>
  );
}

export default function SignUpForm({
  onSwitchToSignIn,
  onSuccess: onSuccessProp,
}: {
  onSwitchToSignIn: () => void;
  onSuccess?: () => void;
}) {
  const navigate = useNavigate({ from: "/" });
  const posthog = usePostHog();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: (ctx) => {
            if (onSuccessProp) {
              onSuccessProp();
            } else {
              const userId = ctx.data?.user?.id;
              posthog.identify(userId);
              posthog.capture("user_signed_up");
              navigate({ to: "/dashboard" });
            }
            toast.success("Sign up successful");
          },
          onError: (error) => {
            posthog.capture("user_sign_up_failed", {
              error: error.error.message || error.error.statusText,
            });
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  return (
    <div className="mx-auto w-full max-w-md space-y-5">
      {/* Social sign-up */}
      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2"
        onClick={() => authClient.signIn.social({ provider: "google" })}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
          or
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Full name</Label>
              <div className="relative">
                <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 flex -translate-y-1/2">
                  <HugeiconsIcon icon={UserIcon} size={16} />
                </span>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Ada Lovelace"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Email</Label>
              <div className="relative">
                <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 flex -translate-y-1/2">
                  <HugeiconsIcon icon={Mail01Icon} size={16} />
                </span>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="ada@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-8"
                />
              </div>
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor={field.name}>Password</Label>
              <div className="relative">
                <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 flex -translate-y-1/2">
                  <HugeiconsIcon icon={LockIcon} size={16} />
                </span>
                <Input
                  id={field.name}
                  name={field.name}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pr-10 pl-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer transition-colors"
                >
                  <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={16} />
                </button>
              </div>
              <PasswordStrength password={field.state.value} />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        {/* Terms */}
        <label htmlFor="terms" className="flex cursor-pointer items-start gap-2.5 pt-1 select-none">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(val) => setAgreed(val === true)}
            className="mt-0.5"
          />
          <span className="text-muted-foreground text-sm leading-snug">
            I agree to the{" "}
            <span className="text-primary font-medium hover:underline">Terms of Service</span> and{" "}
            <span className="text-primary font-medium hover:underline">Privacy Policy</span>
          </span>
        </label>

        {/* Submit */}
        <form.Subscribe>
          {(state) => (
            <Button
              type="submit"
              size="lg"
              className="w-full gap-1.5"
              disabled={!agreed || !state.canSubmit || state.isSubmitting}
            >
              {state.isSubmitting ? (
                "Creating account..."
              ) : (
                <>
                  Create account
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} data-icon="inline-end" />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>

      {/* Footer */}
      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-primary cursor-pointer font-medium hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
