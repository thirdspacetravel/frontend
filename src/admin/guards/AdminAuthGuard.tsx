import React from "react";
import { Navigate, Outlet } from "react-router";
import { trpc } from "../../trpc";

const AdminAuthGuard: React.FC = () => {
  const { data, isLoading, isError } = trpc.adminAuth.check.useQuery(
    undefined,
    {
      retry: false,
      retryOnMount: false,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default AdminAuthGuard;
