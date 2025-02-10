import { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';
import PRODUCTIONS from '../../database/Audiovisual_productions.json';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Main from './Main';
import ProductionDetailsPage from '../production/ProductionDetailsPage';

// Pega todos os gêneros, tipos e serviços de streaming
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

// Define um estado inicial
const initialState = {
  selectedGenre: null,
  selectedType: null,
  selectedStreamService: null,
  searchFilters: {
    search: "",
    genres: [],
    type: null,
    streamService: null,
  },
  selectedProduction: null,
  isDetailsPage: false,
};

// Define o reducer
function appReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_GENRE":
      return {
        ...state,
        selectedGenre: action.payload,
        selectedType: null,
        selectedStreamService: null,
        searchFilters: {
          search: "",
          genres: [],
          type: null,
          streamService: null,
        },
        isDetailsPage: false,
      };
    case "SET_TYPE":
      return {
        ...state,
        selectedGenre: null,
        selectedType: action.payload,
        selectedStreamService: null,
        searchFilters: {
          search: "",
          genres: [],
          type: null,
          streamService: null,
        },
        isDetailsPage: false,
      };
    case "SET_STREAM_SERVICE":
      return {
        ...state,
        selectedGenre: null,
        selectedType: null,
        selectedStreamService: action.payload,
        searchFilters: {
          search: "",
          genres: [],
          type: null,
          streamService: null,
        },
        isDetailsPage: false,
      };
    case "SET_SEARCH_FILTERS":
      return {
        ...state,
        selectedGenre: null,
        selectedType: null,
        selectedStreamService: null,
        searchFilters: action.payload,
        isDetailsPage: false,
      };
    case "SET_PRODUCTION_DETAILS":
      return {
        ...state,
        selectedProduction: action.payload,
        isDetailsPage: true,
      };
    case "RESET_FILTERS":
      return {
        ...state,
        selectedGenre: null,
        selectedType: null,
        selectedStreamService: null,
        searchFilters: {
          search: "",
          genres: [],
          type: null,
          streamService: null,
        },
        isDetailsPage: false,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Função para gerar o filterName dinamicamente
  const generateFilterName = () => {
    if (state.selectedGenre) 
      return `Gênero: ${state.selectedGenre}`;
    if (state.selectedType) 
      return `Tipo: ${state.selectedType}`;
    if (state.selectedStreamService) 
      return `Serviço: ${state.selectedStreamService}`;

    const filters: string[] = [];

    if (state.searchFilters.search)
      filters.push(`Nome: ${state.searchFilters.search}`);
    if (state.searchFilters.genres.length > 0)
      filters.push(`Gênero: ${state.searchFilters.genres.join(", ")}`);
    if (state.searchFilters.type)
      filters.push(`Tipo: ${state.searchFilters.type}`);
    if (state.searchFilters.streamService)
      filters.push(`Serviço: ${state.searchFilters.streamService}`);

    return filters.length > 0 ? `Pesquisa: ${filters.join(", ")}` : "Produções Recomendadas";
  };

  const filterName = generateFilterName();

  const filteredProductions = PRODUCTIONS.audiovisual_productions.filter((production) => {
    const matchesGenre =
      state.selectedGenre || state.searchFilters.genres.length > 0
        ? (state.selectedGenre ? production.genre.map((g) => g.trim()).includes(state.selectedGenre) : true) &&
          state.searchFilters.genres.every((genre: string) => production.genre.map((g) => g.trim()).includes(genre))
        : true;

    const matchesType =
      state.selectedType || state.searchFilters.type
        ? (state.selectedType ? production.type.trim() === state.selectedType : true) &&
          (state.searchFilters.type ? production.type.trim() === state.searchFilters.type : true)
        : true;

    const matchesStreamService =
      state.selectedStreamService || state.searchFilters.streamService
        ? (state.selectedStreamService ? production.streamService.trim() === state.selectedStreamService : true) &&
          (state.searchFilters.streamService ? production.streamService.trim() === state.searchFilters.streamService : true)
        : true;

    const matchesSearch =
      state.searchFilters.search.trim() !== ""
        ? production.name.toLowerCase().includes(state.searchFilters.search.toLowerCase())
        : true;

    return matchesGenre && matchesType && matchesStreamService && matchesSearch;
  });

  const handleProductionClick = (production: any) => {
    dispatch({ type: "SET_PRODUCTION_DETAILS", payload: production });
  };

  const handleBackToList = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <>
      <header className="mb-5">
        <Navbar
          types={allTypes}
          genres={allGenres}
          streamServices={streamServices}
          onGenreSelect={(genre) => dispatch({ type: "SET_GENRE", payload: genre })}
          onTypeSelect={(type) => dispatch({ type: "SET_TYPE", payload: type })}
          onStreamServiceSelect={(streamService) => dispatch({ type: "SET_STREAM_SERVICE", payload: streamService })}
          onSearch={(filters) => dispatch({ type: "SET_SEARCH_FILTERS", payload: filters })}
        />
      </header>
      <div className="top-space"></div>
      <main>
        {state.isDetailsPage ? (
          <ProductionDetailsPage
            production={state.selectedProduction}
            onBackToList={handleBackToList}
          />
        ) : (
          <Main
            productions={filteredProductions}
            filterName={filterName}
            onProductionClick={handleProductionClick}
          />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;