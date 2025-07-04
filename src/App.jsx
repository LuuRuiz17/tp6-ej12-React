import Titulo from "./components/Titulo";
import ListaNoticias from "./components/ListaNoticias";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form"

function App() {

  const {
    register,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    obtenerNoticia();
  }, []);

  const [noticias, setNoticias] = useState([])

  const filtrarRespuesta = async (dato) => {
    let url = "https://newsdata.io/api/1/latest?apikey=pub_22b6a37c0d77443c9b412c3fa017180e&language=es";

    if (dato.filtroCategoria) {
      url += `&category=${dato.filtroCategoria}`;
    }
    if (dato.filtroPais) {
      url += `&country=${dato.filtroPais}`;
    }
    const respuesta = await fetch(url);
    if (respuesta.status === 200) {
      const noticia = await respuesta.json();
      setNoticias(noticia.results);
    } else {
      console.log("no hay noticias de esta combinación")
    }

  }

  const obtenerNoticia = async () => {
    try {
      const respuesta = await fetch('https://newsdata.io/api/1/latest?apikey=pub_22b6a37c0d77443c9b412c3fa017180e&language=es');
      if (respuesta.status === 200) {
        const noticia = await respuesta.json();
        setNoticias(noticia.results);
      }
    } catch (error) {
      console.error("Error al obtener la noticia:", error);
    }
  };

  return (
    <>
      <Titulo></Titulo>
      <Form className="container" onSubmit={handleSubmit(filtrarRespuesta)}>
        <Row className="mx-auto">
          <Col xs={6} className="d-flex">
            <Form.Select className="w-100" {...register('filtroCategoria')}>
              <option value="">Buscar por categoría</option>
              <option value="sports">Deportes</option>
              <option value="science">Ciencia</option>
              <option value="technology">Tecnología</option>
              <option value="world">Mundial</option>
              <option value="food">Comida</option>
              <option value="crime">Policiales</option>
            </Form.Select>
          </Col>
          <Col xs={6} className="d-flex">
            <Form.Select className="w-100" {...register('filtroPais')}>
              <option value="">Seleccionar país</option>
              <option value="ar">Argentina</option>
              <option value="us">Estados Unidos</option>
              <option value="br">Brasil</option>
              <option value="fr">Francia</option>
              <option value="jp">Japón</option>
            </Form.Select>
            <button type="submit" className="btn-form ms-auto"><i className="bi bi-search ms-2"></i></button>
          </Col>
        </Row>
      </Form>
      <ListaNoticias noticias={noticias}></ListaNoticias>
    </>
  )
}

export default App
