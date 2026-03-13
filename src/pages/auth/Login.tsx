import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/utils/Button";
import InteractiveButton from "../../components/utils/InteractiveButton";
import GoogleIcon from "../../icons/GoogleIcon";
import MailIcon from "../../icons/MailIcon";
import LockIcon from "../../icons/LockIcon";
import { trpc } from "../../trpc";
import { useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = trpc.user.login.useMutation({
    onSuccess: () => {
      navigate("/profile");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginMutation.mutateAsync({
      email,
      password,
    });
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (authResponse) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/auth/google`,
          {
            code: authResponse.code,
          },
          { withCredentials: true },
        );
        navigate("/");
      } catch (err) {
        const axiosError = err as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "An unexpected error occurred";
        alert(errorMessage);
      }
    },
    onError: (err) => {
      alert("Google login failed: " + err);
    },
    flow: "auth-code",
  });
  return (
    <main className="auth-page">
      <div className="auth-wrapper">
        <div className="img-container">
          <img src="/images/login.jpg" alt="Third Space Travel" />
        </div>
        <div className="auth-card">
          <header className="auth-card__header">
            <h1 className="auth-card__logo" onClick={() => navigate("/")}>
              THIRD SPACE TRAVEL
            </h1>
            <h2 className="auth-card__title">Welcome back</h2>
            <p className="auth-card__subtitle">
              Enter your credentials to access your account
            </p>
          </header>

          <form className="auth-card__form">
            <div className="form-field">
              <label htmlFor="email" className="form-field__label">
                Email address
              </label>
              <div className="form-field__input-wrapper">
                <MailIcon />
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="form-field__label-row">
                <label htmlFor="password" className="form-field__label">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  title="Recover Password"
                  className="form-field__link"
                >
                  Forgot password?
                </a>
              </div>
              <div className="form-field__input-wrapper">
                <LockIcon />
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <InteractiveButton onClick={handleSignIn} solid>
              Sign In
            </InteractiveButton>
          </form>

          <div className="auth-card__divider">
            <span className="auth-card__divider-text">Or</span>
          </div>

          <Button
            className="login-with-google"
            onClick={() => loginWithGoogle()}
          >
            <GoogleIcon />
            <span>continue with Google</span>
          </Button>

          <footer className="auth-card__footer">
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                type="button"
                className="text-btn"
              >
                Sign Up
              </button>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Login;
