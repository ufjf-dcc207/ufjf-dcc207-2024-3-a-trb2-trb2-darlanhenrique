import "../css/SearchFilter.css";

interface SearchFilterProps {
    onClose: () => void;
    types: string[];
    genres: string[];
    streamService: string[];
}

export default function SearchFilter({ onClose, types, genres, streamService }: SearchFilterProps) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Pesquisar e Filtrar</h2>
                <div className="search-bar row">
                    <div className="col-12">
                        <input type="text" placeholder="🔎 Busca" />
                    </div>
                </div>
                <div className="filters">
                    <a className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseGenre" aria-expanded="false" aria-controls="collapseGenre">
                        Gênero
                    </a>
                    <div style={{ minHeight: 20 }}>
                        <div className="collapse collapse-horizontal" id="collapseGenre">
                            <div className="row d-flex justify-content-center align-items-center">                            
                                {genres.map((genre) => (
                                    <div key={genre} className="form-check form-check-inline col-3">
                                        <input className="form-check-input " type="checkbox" id={`inlineCheckbox1${genre}`} value={genre} />
                                        <label className="form-check-label text-capitalize" htmlFor={`inlineCheckbox1${genre}`}>{genre}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseType" aria-expanded="false" aria-controls="collapseType">
                        Tipo
                    </a>
                    <div style={{ minHeight: 20 }}>
                        <div className="collapse collapse-horizontal" id="collapseType">
                            <div className="row d-flex justify-content-center align-items-center">                            
                                {types.map((type, index) => (
                                    <div key={type} className="form-check form-check-inline col-3 d-flex align-items-center">
                                        <input className="form-check-input " type="radio" name="flexRadiotype" id={`flexRadio${type}${index}`} value={type} />
                                        <label className="form-check-label text-capitalize mt-2 ms-1" htmlFor={`flexRadio${type}${index}`}>{type}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h3>Publicação</h3>
                    <div>
                        <label>
                            <input type="radio" name="streamService" value="all" /> Todas
                        </label>
                        <label>
                            <input type="radio" name="streamService" value="globoplay" /> Globoplay
                        </label>
                        <label>
                            <input type="radio" name="streamService" value="netflix" /> Netflix
                        </label>
                    </div>
                </div>
                <button className="apply-button">Aplicar Filtros</button>
            </div>
        </div>
    );
}
