// Adicionar prop movies.json do watch list - true or false; CHECK
// Drop-down genres ser carregada através do json CHECK
// Adicionar search por genre CHECK
// Drop-down rating ser carregada através do json CHECK
// Adicionar search por rating CHECK
// Adicionar search por input CHECK
// Alterar watchlist para ler o valor de movie.watched CHECK
// Alterar valor de movie.watched através do input checkbox CHECK

/* MINI COURSE DE GIT CHECK 

  Ainda tenho algumas dificuldades que penso se dissiparão com o tempo;
  O setup não deve estar bem feito, pois o tutorial e o processo foi feito para uma pasta de raiz
  A dificuldade está em começar com um repo localmente e enviar. Devo ter feito algo mal
  Contundo, penso ter as bases 

*/

// Stubby4Node Config; CHECK
// ESTABELECER UM END-POINT FUNCIONAL MOVIES CHECK
// ESTABELECER UM END-POINT FUNCIONAL MOVIESINFO CHECK
/* Refatorizar os Ratings; 

  Sei que para além de informação posso passar métodos para um objeto;
  Assim sendo, a minha ideia seria eu criar um método no moviesInfo.json que recebia como argumentos a pontuação do filme - movies.json
  No final, retorna se a pontuação é boa ou má

  NÍVEL 2 - Criar um Array com n entradas;
  O user pode criar mais entradas que fica alocada a um array
  Usando esse array, fazer uma escala dinamica

  P.E se tiver 5 itens - Excelente, Bom, Médio, Mau, Terrível. Sabemos que a pontuação é de 0 a 10 então dinamicamente criar os intervalos:

  Excelente 10-8
  Bom 8-6 ...

  E isto ser dinâmico com o número de entradas. PROBLEMA é que a ordem vai importar, o que vai implicar andar alterar a ordem.

*/





// GIT

import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);

  //const [test, setTest] = useState([]);


  //ORIGINAL CODE

/*   useEffect(() => {   
    fetch('movies.json')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []); */

  //TESTING CODE
/*   useEffect(() => {
    fetch('http://localhost:8882/movies/get-movies')
      .then((response) => response.json())
      .then((data) => {
        setTest(data);
      });
  }, []);

  console.log(test); */

  //FINAL CODE
  useEffect(() => {
    fetch('http://localhost:8882/movies/get-movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [])

  const toggleWatched = (id, watched) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === id ? { ...movie, watched: watched } : movie
    );
    setMovies(updatedMovies);
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<MoviesGrid movies={movies} toggleWatched={toggleWatched} />}
            />
            <Route
              path="/watchlist"
              element={<Watchlist watchlist={movies.filter(movie => movie.watched)} toggleWatched={toggleWatched}/>}
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
