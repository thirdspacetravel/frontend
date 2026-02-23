import React from "react";
import { Navigate, Outlet } from "react-router";
import { trpc } from "../../trpc";

const AdminLoginGuard: React.FC = () => {
  const { data, isLoading } = trpc.adminAuth.checkStatus.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data?.authenticated) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default AdminLoginGuard;
