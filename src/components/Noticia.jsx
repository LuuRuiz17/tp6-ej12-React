import { Card } from "react-bootstrap";
import imgDefault from "../assets/img-noticias-default.jpg"

const Noticia = ({ noticia }) => {
    return (
        <a href={noticia.link} className="enlace">
            <Card className="card h-100 rounded rounded-4">
                <Card.Img className="img-card" variant="top" src={noticia.image_url ? noticia.image_url : imgDefault} alt="imagen de la Noticia" />
                <Card.Body className="h-100">
                    <Card.Text>{noticia.creator ? noticia.creator : "Autor anónimo"}</Card.Text>
                    <Card.Title>{noticia.title}</Card.Title>
                    <Card.Text className="cortar-texto">{noticia.description ? noticia.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
};

export default Noticia;