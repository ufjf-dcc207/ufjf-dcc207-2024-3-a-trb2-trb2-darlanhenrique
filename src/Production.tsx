import "./Production.css";

interface ProductionProps {
    name: string;
    type: string;
    genre: string;
    length: number;
    description: string;
    image: string;
    isNew?: boolean;
}

export default function Production({name, type, genre, length, description, image, isNew,}: ProductionProps) {
  return (
    <div className="production">
        <div className="name">{name}</div>
        <div className="type">{type}</div>
        <div className="genre">{genre}</div>
        <div className="length">{length}{type === "filme" || type === "documentario" ? " min." : " ep."}</div>
        <div className="description">{description}</div>
        <img src={image} alt={name} />
        {isNew && <div className="new">Novo!</div>}
    </div>
  );
}