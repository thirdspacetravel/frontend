import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/utils/Button";
import GoogleIcon from "../../icons/GoogleIcon";
import MailIcon from "../../icons/MailIcon";
import LockIcon from "../../icons/LockIcon";
import UserIcon from "../../icons/UserIcon";
import { trpc } from "../../trpc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import InteractiveButton from "../../components/utils/InteractiveButton";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signupMutation = trpc.user.signup.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        if (data.emailSent)
          alert("Email verification sent! Please check your inbox.");
        else
          alert(
            "Registration successful! Verification Email not Sent. Please try to log in.",
          );
      } else alert("Registration failed! Please try again.");
      navigate("/profile");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signupMutation.mutateAsync({
      fullName,
      email,
      password,
    });
  };

  const signUpWithGoogle = useGoogleLogin({
    onSuccess: async (authResponse) => {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth/google`,
        {
          code: authResponse.code,
        },
        { withCredentials: true },
      );
      navigate("/");
    },
    flow: "auth-code",
  });

  return (
    <main className="auth-page">
      <div className="auth-wrapper">
        <div className="img-container">
          <img src="/images/register.jpg" alt="Third Space Travel" />
        </div>
        <div className="auth-card">
          <header className="auth-card__header">
            <h1 className="auth-card__logo" onClick={() => navigate("/")}>
              THIRD SPACE TRAVEL
            </h1>
            <h2 className="auth-card__title">Create an account</h2>
            <p className="auth-card__subtitle">
              Start your journey with us today
            </p>
          </header>

          <form className="auth-card__form">
            <div className="form-field">
              <label htmlFor="fullname" className="form-field__label">
                Full Name
              </label>
              <div className="form-field__input-wrapper">
                <UserIcon />
                <input
                  id="fullname"
                  type="name"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
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

            <InteractiveButton onClick={handleSignUp} solid>
              Sign Up
            </InteractiveButton>
          </form>

          <div className="auth-card__divider">
            <span className="auth-card__divider-text">Or</span>
          </div>

          <Button
            className="login-with-google"
            onClick={() => signUpWithGoogle()}
          >
            <GoogleIcon />
            <span>Register with Google</span>
          </Button>

          <footer className="auth-card__footer">
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  navigate("/login");
                }}
                type="button"
                className="text-btn"
              >
                Sign In
              </button>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Register;
