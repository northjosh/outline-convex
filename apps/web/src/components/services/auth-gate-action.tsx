import * as React from "react";

import { useCurrentProfile } from "@/hooks/use-current-profile";

import SignInForm from "../sign-in-form";
import SignUpForm from "../sign-up-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface AuthGateActionProps {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  onAuthenticated: () => void;
}

/**
 * Wraps a clickable element (e.g. a Button). If the user is authenticated,
 * clicks pass through to `onAuthenticated`. Otherwise, an auth dialog appears.
 *
 * After successful sign-in/sign-up via the dialog, Convex reactivity
 * automatically updates all queries — no manual refresh needed.
 */
export function AuthGateAction({ children, onAuthenticated }: AuthGateActionProps) {
  const { isAuthenticated } = useCurrentProfile();
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"sign-in" | "sign-up">("sign-in");

  const handleClick: React.MouseEventHandler = (e) => {
    if (isAuthenticated) {
      onAuthenticated();
    } else {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setOpen(false);
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0">
          <DialogClose />
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>
              {mode === "sign-in" ? "Sign in to continue" : "Create an account"}
            </DialogTitle>
            <DialogDescription>
              {mode === "sign-in"
                ? "Sign in to book sessions, purchase materials, and connect with educators."
                : "Join Outline to access quality educational services from verified Ghanaian educators."}
            </DialogDescription>
          </DialogHeader>

          <div className="[&>div]:mt-0 [&>div]:max-w-none [&>div]:p-6 [&>div]:pt-2">
            {mode === "sign-in" ? (
              <SignInForm
                onSwitchToSignUp={() => setMode("sign-up")}
                onSuccess={handleAuthSuccess}
              />
            ) : (
              <SignUpForm
                onSwitchToSignIn={() => setMode("sign-in")}
                onSuccess={handleAuthSuccess}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
