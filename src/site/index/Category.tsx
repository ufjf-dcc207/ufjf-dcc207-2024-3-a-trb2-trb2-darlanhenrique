import "../../css/Category.css";
import { ReactNode } from "react";

interface CategoryProps {
    name: string;
    type?: string;
    children?: ReactNode;
}

export default function Category({ name, type, children: productions }: CategoryProps) {

    return (
        <div className="category mt-5">
            <div className="category_name" id={name}>
                {type === "category" ? "Categoria: " : ""} {name}{type === "category" ? "" : "s"}
            </div>
            <div className="productions">
                {productions}
            </div>
        </div>
    );
}
