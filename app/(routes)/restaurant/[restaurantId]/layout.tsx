export default function RestaurantPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-w-screen-xl mx-auto h-screen my-4">
      { children }
    </main>
  )

}