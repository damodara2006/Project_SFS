import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
    <div className="home-page flex flex-col content-center items-center gap-10 mt-20">
        <SearchBar />
    </div>
    <section>
        <Footer/>
    </section>
    </>
  )
}

export default Home