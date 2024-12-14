import "./Production.css";

interface ProductionProps {
    name: string;
    year: number;
    type: string;
    genre: string;
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
}

export default function Production({name, year, type, genre, length, description, image, isNew,}: ProductionProps) {
  return (
    <div className="production">
        <div className="image-container">
            <img className="image" src={`./src/assets/productions/${image}`} alt={name} />
            {isNew && <div className="new">{type === "série" || type === "novela" ? "Nova" : " Novo"} {type}</div>}
        </div>
        <div className="details">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="type">{type}</div>
            <div className="year">{year}</div>
            <div className="length">{length}{type === "filme" || type === "documentario" ? " min" : " episódios"}</div>
            <div className="genre">{genre}</div>
        </div>
    </div>
  );
}