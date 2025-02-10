import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css'
import PRODUCTIONS from '../../database/Audiovisual_productions.json'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Main from './Main';

const allGenres: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .flatMap((production) => production.genre.map((genre) => genre.trim()))
  )
);

const allTypes: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.type.trim())
  )
);

const streamServices: string[] = Array.from(
  new Set(
    PRODUCTIONS.audiovisual_productions
      .map((production) => production.streamService.trim())
  )
);


function App() {
  return (
    <>
      <header className='mb-5'>
        <Navbar types={allTypes} genres={allGenres} streamServices={streamServices} />
      </header>
      <div className="top-space"></div>
      <main>
        <Main></Main>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
