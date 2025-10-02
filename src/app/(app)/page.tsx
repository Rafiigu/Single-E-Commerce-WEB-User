"use client";

import { useAuth } from "@/components/providers/auth-provider";

const HomePage = () => {
  const { user } = useAuth();

  return <div className="flex flex-row items-center justify-center h-[100vh]"><div>Hello, {user?.name}</div></div>;
};

export default HomePage;
