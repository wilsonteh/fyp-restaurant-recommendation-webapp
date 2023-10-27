export default function RestaurantPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-w-screen-xl mx-auto h-screen">
      { children }
    </main>
  )

}