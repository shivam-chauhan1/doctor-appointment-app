import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Doctor | Doctor Appointment App",
  description: "Find and book appointments with the best doctors in your area",
};

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
