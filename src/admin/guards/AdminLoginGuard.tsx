import React from "react";
import { Navigate, Outlet } from "react-router";
import { trpc } from "../../trpc";

const AdminLoginGuard: React.FC = () => {
  const { data, isLoading } = trpc.adminAuth.check.useQuery(undefined, {
    retry: false,
    retryOnMount: false,
  });

  if (isLoading) {
    return <Outlet />;
  }
  if (data) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default AdminLoginGuard;
