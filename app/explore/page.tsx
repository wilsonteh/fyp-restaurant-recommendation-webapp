import SearchBar from "@/components/SearchBar";

export default async function ExplorePage() {

  return (
    <main className="max-w-screen-md mx-auto h-screen border-red-500">
      <div className="my-4">
        <SearchBar />
      </div>

      {/* <div>Filter options</div> */}
    </main>
  )
}