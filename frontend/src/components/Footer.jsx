

const Footer = () => {
  return (
    <>
      <footer className="bg-[#4a4a4a] text-white py-4 mt-20 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} SFS Project. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer