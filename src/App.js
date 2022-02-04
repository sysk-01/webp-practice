import React, { useEffect, useState } from "react";
import { fetchFilms } from "./api";
import data from "./data/film_data.json";

function Header() {
    return (
        <header className="hero is-info is-bold is-mediam">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Ghibli Movies</h1>
                </div>
            </div>
        </header>
    );
}

function Loading() {
    return (
        <p className="title has-text-centered">Loading...</p>
    );
}

function List(props){
    const per_data = props.per_data;
    return(
        <ul>
            {per_data.map((per, i) => 
            <li key={i}>{per}</li>)}
        </ul>
    );
}

function Filmdata(props) {
    const { id } = props;
    if (id == null) {
        return <Loading />;
    }
    const per_data = data.films.filter(function(item){
        if(item.id == id.title) return true;
    });
    return (
        <div>
            <h2 className="title has-text-centered">{id.title}</h2>
            <div className="columns">
                <div className="column">
                    <figure className="content">
                        <figure className="is-half">
                            <figure className="image is-3by2">
                                <img src={id.movie_banner} alt={id.original_title} />
                            </figure>
                        </figure>
                    </figure>
                </div>
                <div className="column">
                    <figure className="content">
                        <ul>
                            <li className="subtitle">Original Title : {id.original_title}</li>
                            <li className="subtitle">
                                <p>Description<br />{id.description}</p>
                            </li>
                            <li className="subtitle">
                                Main Character <List per_data = {per_data[0].people}/>
                            </li>
                        </ul>
                    </figure>
                </div>
            </div>
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { films } = event.target.elements;
        props.onFormSubmit(films.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="title has-text-centered">Choose Movies</h2>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="films" defaultValue="58611129-2dbc-4a81-a72f-77ddfc1b1b49">
                                <option value="2baf70d1-42bb-4437-b551-e5fed5a87abe">天空の城ラピュタ</option>
                                <option value="58611129-2dbc-4a81-a72f-77ddfc1b1b49">となりのトトロ</option>
                                <option value="ea660b10-85c4-4ae3-8a5f-41cea3648e3e">魔女の宅急便</option>
                                <option value="0440483e-ca0e-4120-8c50-4c8cd9b965d6">もののけ姫</option>
                                <option value="dc2e6bd1-8156-4886-adff-b39e6043af0c">千と千尋の神隠し</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-info">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Main() {
    const [id, setUrl] = useState(null);
    useEffect(() => {
        fetchFilms("58611129-2dbc-4a81-a72f-77ddfc1b1b49").then((id) => {
            setUrl(id);
        });
    }, []);

    function reloadfilmData(films) {
        fetchFilms(films).then((id) => {
            setUrl(id);
        });
    }

    return (
        <main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadfilmData} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Filmdata id={id} />
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Informations are retrieved from Studio Ghibli API.</p>
                <p>
                    Home link to <a href="https://ghibliapi.herokuapp.com/">Studio Ghibli API</a>
                </p>
                <p>&copy;5420038 坂井俊亮</p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;