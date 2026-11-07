
"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  application: string;
  environment: string;
  deployment: string;
  apiStatus: string;
  databaseStatus: string;
  metrics: {
    deployments: number;
    activeServices: number;
    incidents: number;
  };
}

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [apiOnline, setApiOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const result = await response.json();

        setData(result);
        setApiOnline(true);
      } catch (error) {
        console.error("Dashboard API error:", error);
        setApiOnline(false);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const stats = [
    {
      label: "Deployments",
      value: data?.metrics.deployments ?? "--",
    },
    {
      label: "Active Services",
      value: data?.metrics.activeServices ?? "--",
    },
    {
      label: "Open Incidents",
      value: data?.metrics.incidents ?? "--",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        <aside className="hidden w-64 border-r border-slate-800 bg-slate-900 p-6 md:block">
          <h1 className="text-2xl font-bold tracking-wider">
            NEXORA<span className="text-blue-500">.</span>
          </h1>

          <p className="mt-2 text-xs text-slate-400">
            CLOUD OPERATIONS
          </p>

          <nav className="mt-12 space-y-3 text-sm">
            <div className="rounded-lg bg-blue-600 px-4 py-3">
              Dashboard
            </div>
            <div className="px-4 py-3 text-slate-400">
              Deployments
            </div>
            <div className="px-4 py-3 text-slate-400">
              Infrastructure
            </div>
            <div className="px-4 py-3 text-slate-400">
              Monitoring
            </div>
            <div className="px-4 py-3 text-slate-400">
              Settings
            </div>
          </nav>
        </aside>

        <section className="flex-1 p-6 md:p-10">

          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">
                Nexora / Overview
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Cloud Operations
              </h2>
              <p className="mt-2 text-slate-400">
                Monitor your application infrastructure.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 px-4 py-3 text-sm">
              <span className={
                apiOnline ? "text-green-400" : "text-red-400"
              }>
                ● {apiOnline ? "API Online" : "API Offline"}
              </span>
            </div>
          </header>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <p className="text-sm text-slate-400">
                  {stat.label}
                </p>
                <h3 className="mt-4 text-3xl font-bold">
                  {loading ? "..." : stat.value}
                </h3>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">
                Application Health
              </h3>

              <div className="mt-6 space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Backend API
                  </span>
                  <span className={
                    apiOnline ? "text-green-400" : "text-red-400"
                  }>
                    {apiOnline ? "Operational" : "Unavailable"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Database
                  </span>
                  <span className="text-yellow-400">
                    {data?.databaseStatus ?? "Checking"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Environment
                  </span>
                  <span className="text-blue-400">
                    {data?.environment ?? "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-semibold">
                Deployment Information
              </h3>

              <div className="mt-6 space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Application
                  </span>
                  <span>Nexora SaaS Starter</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Deployment
                  </span>
                  <span className="text-green-400">
                    {data?.deployment ?? "Pending"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Platform
                  </span>
                  <span>Next.js + Node.js</span>
                </div>
              </div>
            </div>

          </div>

          <footer className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
            Nexora Cloud Operations Demo · Foundation Sprint v1.0
          </footer>

        </section>
      </div>
    </main>
  );
}

