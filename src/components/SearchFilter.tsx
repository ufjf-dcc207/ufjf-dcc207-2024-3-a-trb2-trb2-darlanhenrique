import "../css/SearchFilter.css";
import React, { useState } from "react";

interface SearchFilterProps {
    onClose: () => void;
    types: string[];
    genres: string[];
    streamServices: string[];
    onSearch: (filters: {
        search: string;
        genres: string[];
        type: string | null;
        streamService: string | null;
    }) => void;
}

export default function SearchFilter({ onClose, types, genres, streamServices, onSearch,}: SearchFilterProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const payload = {
                search: formData.get("search")?.toString().trim() || "",
                genres: formData.getAll("genre").map((genre) => genre.toString().trim()),
                type: formData.get("type")?.toString().trim() || null,
                streamService: formData.get("streamService")?.toString().trim() || null,
            };
            onSearch(payload);
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
        } finally {
            setIsSubmitting(false);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={onClose}>✖</button>
                    <h2>Pesquisar e Filtrar</h2>
                    <div className="search-bar row">
                        <div className="col-12">
                            <input name="search" id="search" type="text" placeholder="🔎 Busca" />
                        </div>
                    </div>
                    <div className="filters">
                        <a className="collapseTitle" data-bs-toggle="collapse" data-bs-target="#collapseGenre" aria-expanded="false" aria-controls="collapseGenre">
                            Gênero
                        </a>
                        <div style={{ minHeight: 0 }}>
                            <div className="collapse collapse-horizontal" id="collapseGenre">
                                <div className="row d-flex justify-content-center align-items-center">
                                    {genres.map((genre) => (
                                        <div key={genre} className="form-check form-check-inline col-3">
                                            <input name="genre" className="form-check-input" type="checkbox" id={`inlineCheckbox1${genre}`} value={genre} />
                                            <label className="form-check-label text-capitalize" htmlFor={`inlineCheckbox1${genre}`}>{genre}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a className="collapseTitle" data-bs-toggle="collapse" data-bs-target="#collapseType" aria-expanded="false" aria-controls="collapseType">
                            Tipo
                        </a>
                        <div style={{ minHeight: 0 }}>
                            <div className="collapse collapse-horizontal" id="collapseType">
                                <div className="row d-flex justify-content-center align-items-center">
                                    {types.map((type, index) => (
                                        <div key={type} className="form-check form-check-inline col-3 d-flex align-items-center">
                                            <input className="form-check-input" type="radio" name="type" id={`flexRadio${type}${index}`} value={type} />
                                            <label className="form-check-label text-capitalize mt-2 ms-1" htmlFor={`flexRadio${type}${index}`}>{type}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a className="collapseTitle" data-bs-toggle="collapse" data-bs-target="#collapseStreamSerice" aria-expanded="false" aria-controls="collapseStreamSerice">
                            Serviço de Streaming
                        </a>
                        <div style={{ minHeight: 0 }}>
                            <div className="collapse collapse-horizontal" id="collapseStreamSerice">
                                <div className="row d-flex justify-content-center align-items-center">
                                    {streamServices.map((streamService, index) => (
                                        <div key={streamService} className="form-check form-check-inline col-3 d-flex align-items-center">
                                            <input className="form-check-input" type="radio" name="streamService" id={`flexRadio${streamService}${index}`} value={streamService} />
                                            <label className="form-check-label text-capitalize mt-2 ms-1" htmlFor={`flexRadio${streamService}${index}`}>{streamService}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="apply-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Aplicando Filtros..." : "Aplicar Filtros"}
                    </button>
                </div>
            </div>
        </form>
    );
}