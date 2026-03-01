import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { trpc } from "../trpc";
import Spinner from "../components/utils/Spinner";
import UserVerifiedIcon from "../icons/UserTickIcon";
import UserRemoveIcon from "../icons/UserSuspend";
import Button from "../components/utils/InteractiveButton";
export const VerifyEmail: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [errorMessage, setErrorMessage] = useState(
    token ? "" : "No verification token provided.",
  );
  const verifyMutation = trpc.user.verifyEmail.useMutation({
    onSuccess: () => {
      setStatus("success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      setStatus("error");
      setErrorMessage(
        error.message ||
          "Verification failed. The link might be invalid or expired.",
      );
    },
  });

  const handleVerify = useCallback(() => {
    if (token && status === "loading" && !isMounted.current) {
      isMounted.current = true; // Mark as sent
      verifyMutation.mutate({ token });
    }
  }, [token, status, verifyMutation]);

  useEffect(() => {
    handleVerify();
  }, [handleVerify]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {status === "loading" && (
          <>
            <Spinner size={30} strokeWidth={2} color="#000" />
            <h2>Verifying Your Email...</h2>
            <p>Please wait while we activate your account.</p>
          </>
        )}

        {status === "success" && (
          <>
            <UserVerifiedIcon className="verify-icon" />
            <h2>Email Verified!</h2>
            <p>Your account is now active. Redirecting you to the home...</p>
          </>
        )}

        {status === "error" && (
          <>
            <UserRemoveIcon className="error-icon" />
            <h2>Verification Failed</h2>
            <p>{errorMessage}</p>
            <Button solid onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
