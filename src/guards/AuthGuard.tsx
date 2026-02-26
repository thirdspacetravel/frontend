import React from "react";
import { Navigate, Outlet } from "react-router";
import { trpc } from "../trpc";
import Spinner from "../components/utils/Spinner";

const AuthGuard: React.FC = () => {
  const { data, isLoading, isError } = trpc.user.checkStatus.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading) {
    return (
      <div className="auth-guard-container">
        <Spinner
          size={50}
          color="#333"
          trackColor="rgba(51, 51, 51, 0.3)"
          strokeWidth={2}
        />
      </div>
    );
  }
  if (isError || !data?.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
