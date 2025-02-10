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
  const [searchFilters, setSearchFilters] = useState<{
    search: string;
    genres: string[];
    type: string | null;
    streamService: string | null;
  }>({
    search: "",
    genres: [],
    type: null,
    streamService: null,
  });
  const generateFilterName = () => {
    const filters: string[] = [];

    if (searchFilters.search) {
      filters.push(`Nome: ${searchFilters.search}`);
    }
    if (searchFilters.genres.length > 0) {
      filters.push(`Gênero: ${searchFilters.genres.join(", ")}`);
    }
    if (searchFilters.type) {
      filters.push(`Tipo: ${searchFilters.type}`);
    }
    if (searchFilters.streamService) {
      filters.push(`Serviço: ${searchFilters.streamService}`);
    }

    return filters.length > 0 ? `Pesquisa: ${filters.join(", ")}` : "Produções Recomendadas";
  };
  const filterName = generateFilterName();
  const filteredProductions = PRODUCTIONS.audiovisual_productions.filter((production) => {
    const matchesGenre =
      selectedGenre || searchFilters.genres.length > 0
        ? (selectedGenre ? production.genre.map((g) => g.trim()).includes(selectedGenre) : true) &&
        searchFilters.genres.every((genre) => production.genre.map((g) => g.trim()).includes(genre))
        : true;

    const matchesType =
      selectedType || searchFilters.type
        ? (selectedType ? production.type.trim() === selectedType : true) &&
        (searchFilters.type ? production.type.trim() === searchFilters.type : true)
        : true;

    const matchesStreamService =
      selectedStreamService || searchFilters.streamService
        ? (selectedStreamService ? production.streamService.trim() === selectedStreamService : true) &&
        (searchFilters.streamService ? production.streamService.trim() === searchFilters.streamService : true)
        : true;

    const matchesSearch =
      searchFilters.search.trim() !== ""
        ? production.name.toLowerCase().includes(searchFilters.search.toLowerCase())
        : true;

    return matchesGenre && matchesType && matchesStreamService && matchesSearch;
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
          }}
          onTypeSelect={(type) => {
            setSelectedType(type);
            setSelectedGenre(null);
            setSelectedStreamService(null);
          }}
          onStreamServiceSelect={(streamService) => {
            setSelectedStreamService(streamService);
            setSelectedGenre(null);
            setSelectedType(null);
          }}
          onSearch={(filters) => setSearchFilters(filters)}
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