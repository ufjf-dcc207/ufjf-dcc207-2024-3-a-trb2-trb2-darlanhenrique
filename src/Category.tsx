import React from "react";
import "./Category.css";
import { ReactNode, useState } from "react";

interface CategoryProps {
    name: string;
    type?: string;
    children?: ReactNode;
}

export default function Category({ name, type, children: productions }: CategoryProps) {

    const [showAll, setShowAll] = useState(false);
    const productionArray = React.Children.toArray(productions);

    const visibleProductions = showAll ? productionArray : productionArray.slice(0, 3);

    const handleToggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="category">
            <div className="category_name" id={name}>
                {type === "category" ? "Categoria: " : ""} {name}{type === "category" ? "" : "s"}

                {productionArray.length > 3 && (
                    <span className="carousel-link" onClick={handleToggleShowAll}>
                        {showAll ? "Ver menos <" : "Ver mais >"}
                    </span>
                )}
            </div>
            <div className="productions">
                {visibleProductions}
            </div>
            {productionArray.length > 3 && (
                <button className="carousel-button" onClick={handleToggleShowAll}>
                    {showAll ? "Mostrar menos" : "Ver mais"}
                </button>
            )}
      
        </div>
    );
}
