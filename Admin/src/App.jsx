import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
const Dashboard = lazy(() => import("./pages/dashboard"));

const Login3 = lazy(() => import("./pages/auth/login3"));
const Register3 = lazy(() => import("./pages/auth/register3"));

const ForgotPass3 = lazy(() => import("./pages/auth/forgot-password3"));
const LockScreen3 = lazy(() => import("./pages/auth/lock-screen3"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";


const ComingSoonPage = lazy(() => import("./pages/utility/coming-soon"));
const UnderConstructionPage = lazy(() =>
  import("./pages/utility/under-construction")
);
const AccountPostPage = lazy(() => import("./pages/account"));
const InvoicePostPage = lazy(() => import("./pages/invoice"));
const TransactionPostPage = lazy(() => import("./pages/transaction"));
const Settings = lazy(() => import("./pages/utility/settings"));
const Profile = lazy(() => import("./pages/utility/profile"));
const NotificationPage = lazy(() => import("./pages/utility/notifications"));



import Loading from "@/components/Loading";
function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login3 />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register3 />
            </Suspense>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPass3 />
            </Suspense>
          }
        />

        <Route
          path="/lock-screen"
          element={
            <Suspense fallback={<Loading />}>
              <LockScreen3 />
            </Suspense>
          }
        />
        <Route path="/admin" element={<Layout />}>
          {" "}
          <Route index element={<Dashboard />} />
          <Route path="invoice" element={<InvoicePostPage />} />
          <Route path="transaction" element={<TransactionPostPage />} />
          <Route path="account" element={<AccountPostPage />} />
         
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
        <Route
          path="/coming-soon"
          element={
            <Suspense fallback={<Loading />}>
              <ComingSoonPage />
            </Suspense>
          }
        />
        <Route
          path="/under-construction"
          element={
            <Suspense fallback={<Loading />}>
              <UnderConstructionPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
