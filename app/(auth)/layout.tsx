export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 via-white to-brand-secondary/5">
      {children}
    </div>
  )
}