import Card from "./components/Card"
import Contacts from "./components/Contacts"
import Ranking from "./components/Ranking"
import Pagination from "./components/Pagination"
import { useCard } from "./hooks/useCard"
import { useContacts } from "./hooks/useContacts"
import { usePagination } from "./hooks/usePagination"

function App() {
  const { data, random1, random2, alClicPrimeraImagen, alClicSegundaImagen } =
    useCard()
  const { openTwitter, openGmail, openGithub } = useContacts()
  const { currentPage, setCurrentPage, calculateTotalPages, entriesPerPage } = usePagination()

  console.log(calculateTotalPages)
  return (
    <>
      <div className='min-h-dvh px-4 py-6 sm:p-8'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl text-center font-bold tracking-tight'>
          RA<span className='text-orange-400'>WAIFU</span>
        </h1>
        <div className='w-full max-w-4xl mx-auto bg-orange-400 mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 cursor-pointer rounded-lg overflow-hidden shadow-lg shadow-black/20'>
          <Card
            key={`${random1}-${random2}`}
            name1={data[random1].name}
            name2={data[random2].name}
            image1={data[random1].image}
            image2={data[random2].image}
            onClickImage1={alClicPrimeraImagen}
            onClickImage2={alClicSegundaImagen}
          />
        </div>
        <div className="my-6 sm:my-10 flex justify-center">
          <Contacts 
            openTwitter={openTwitter}
            openGmail={openGmail}
            openGithub={openGithub}  
          />
        </div>
        <Ranking 
          data={data} 
          currentPage={currentPage}
          entriesPerPage={entriesPerPage}
        />
        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          calculateTotalPages={calculateTotalPages}
        />
      </div>
      <footer className="pb-3">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
          <p className="text-gray-700 text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} RA<span className="text-orange-400">WAIFU</span> • Diseñado por <span className="text-orange-400 font-semibold">Jamir Castilla</span>
          </p>
        </div>
      </footer>
    </> 
  )
}

export default App