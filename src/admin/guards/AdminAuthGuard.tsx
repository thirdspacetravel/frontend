import React from "react";
import { Navigate, Outlet } from "react-router";
import { trpc } from "../../trpc";

const AdminAuthGuard: React.FC = () => {
  const { data, isLoading, isError } = trpc.adminAuth.checkStatus.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading) {
    return (
      <div>
        <p>Verifying Admin Session...</p>
      </div>
    );
  }
  if (isError || !data?.authenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default AdminAuthGuard;
