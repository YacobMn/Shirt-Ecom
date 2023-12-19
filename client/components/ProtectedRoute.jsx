// This component is used to double-check if a user is allowed access to a certain route. It was largely untouched from the boilerplate

import { Route, Navigate } from "react-router-dom"
import { useAppCtx } from "../utils/AppProvider";

export default function ProtectedRoute({ children }){
  const { user } = useAppCtx()

  if (!user.email) {
    <Navigate to="/auth" replace />;
  }

  return children;
};