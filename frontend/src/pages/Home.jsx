import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex flex-col items-center gap-10 mt-20">
        <SearchBar />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home