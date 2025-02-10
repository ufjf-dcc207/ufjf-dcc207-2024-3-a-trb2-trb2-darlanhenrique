import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import PRODUCTIONS from '../../database/Audiovisual_productions.json';
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
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStreamService, setSelectedStreamService] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string>("Produções Recomendadas");

  const filteredProductions = PRODUCTIONS.audiovisual_productions.filter((production) => {
    const matchesGenre = selectedGenre ? production.genre.map((g) => g.trim()).includes(selectedGenre) : true;
    const matchesType = selectedType ? production.type.trim() === selectedType : true;
    const matchesStreamService = selectedStreamService ? production.streamService.trim() === selectedStreamService : true;
    return matchesGenre && matchesType && matchesStreamService;
  });

  return (
    <>
      <header className="mb-5">
        <Navbar
          types={allTypes}
          genres={allGenres}
          streamServices={streamServices}
          onGenreSelect={(genre) => {
            setSelectedGenre(genre);
            setSelectedType(null);
            setSelectedStreamService(null);
            setFilterName(genre ? `Gênero: ${genre}` : "Produções Recomendadas");
          }}
          onTypeSelect={(type) => {
            setSelectedType(type);
            setSelectedGenre(null);
            setSelectedStreamService(null);
            setFilterName(type ? `Tipo: ${type}` : "Produções Recomendadas");
          }}
          onStreamServiceSelect={(streamService) => {
            setSelectedStreamService(streamService);
            setSelectedGenre(null);
            setSelectedType(null);
            setFilterName(streamService ? `Serviço: ${streamService}` : "Produções Recomendadas");
          }}
        />
      </header>
      <div className="top-space"></div>
      <main>
        <Main productions={filteredProductions} filterName={filterName} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;