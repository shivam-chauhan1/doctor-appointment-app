import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard | Doctor Appointment App",
  description: "Manage your appointments and medical records",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
