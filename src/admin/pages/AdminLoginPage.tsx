import React, { useState } from "react";
import { TextInput } from "../../components/utils/InputUtils";
import Button from "../../components/utils/Button";
import { trpc } from "../../trpc/index";
import { useNavigate } from "react-router";
const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: () => {
      navigate("/admin");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      username: credentials.username,
      password: credentials.password,
    });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSignIn}>
        <h1>Welcome back, Admin</h1>

        <TextInput
          label="Username"
          id="username"
          name="username"
          placeholder="ENTER USERNAME"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <TextInput
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="ENTER PASSWORD"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" solid>
          SIGN IN
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
