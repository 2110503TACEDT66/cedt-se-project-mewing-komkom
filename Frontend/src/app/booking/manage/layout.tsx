export default function ManageReservationLayout({
  children,
  dashboard,
  manage,
}: {
  children: React.ReactNode;
  dashboard: React.ReactNode;
  manage: React.ReactNode;
}) {
  return (
    <div style={{ border: "1px solid black", padding: "20px" }}>
      {children}
      {dashboard}
      {manage}
    </div>
  );
}
