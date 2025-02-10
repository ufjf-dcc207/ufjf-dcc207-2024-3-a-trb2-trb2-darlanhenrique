import "../../css/Category.css";
import React, { ReactNode, useState, useEffect } from "react";

interface CategoryProps {
    name: string;
    children?: ReactNode;
}

export default function Category({ name, children: productions }: CategoryProps) {
    const productionArray = React.Children.toArray(productions);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        setCurrentPage(0);
    }, [name]);

    const visibleProductions = productionArray.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < productionArray.length)
            setCurrentPage(prev => prev + 1);
    };
    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(prev => prev - 1);
    };

    if (name === "Novas Produções") {
        return (
            <div className="category mt-5">
                <div id="NewProductionCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {productionArray.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#NewProductionCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {productionArray.map((production, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={React.isValidElement(production) ? production.props.name : index}>
                                {production}
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev -ms-8 new_carrousel_button"
                        type="button"
                        data-bs-target="#NewProductionCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next -me-8 new_carrousel_button"
                        type="button"
                        data-bs-target="#NewProductionCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {productionArray.length > 0 ? (
                <div className="category mt-5">
                    {name !== "Produções Recomendadas" && (
                        <div className="category_result text-start mt-4">
                            {productionArray.length > 1 ? `Foram encontrados ${productionArray.length} resultados ` : "Foi encontrado um resultado "} para a sua pesquisa:
                        </div>
                    )}
                    <div className="category_name" id={name}>{name}</div>
                    <div className="production-list-container carousel" data-bs-ride="carousel">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 carousel-inner">
                            {visibleProductions.map((productionArray) => (
                                <div className="col" key={React.isValidElement(productionArray) ? productionArray.key : undefined}>
                                    {productionArray}
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            {currentPage > 0 && (
                                <button
                                    className="carousel-control-prev -ms-8 new_carrousel_button"
                                    type="button"
                                    data-bs-slide="prev"
                                    onClick={prevPage}
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                            )}

                            {(currentPage + 1) * itemsPerPage < productionArray.length && (
                                <button
                                    className="carousel-control-next -me-8 new_carrousel_button"
                                    type="button"
                                    data-bs-slide="next"
                                    onClick={nextPage}
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            ) : (
                <div className="category mt-5">
                    <div className="space-to-page"></div>
                    <div className="category_result text-center mt-4">Não encontramos nenhuma produção com esses filtros. Tente novamente!</div>
                    <div className="space-to-page"></div>
                </div>

            )}
        </>
    );
}
