import { useState, useEffect } from "react";
import { Form } from "antd";
import MovieCard from "./MovieCard";
import { Button } from "antd";
import {
  apiKey,
  base_uri,
  images_uri,
  getPosterUrl,
  getLink,
  getId,
  getMovieData,
} from "./movie_api";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase";
import {
  doc,
  getDoc,
  addDoc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const PopularMovies = (history, props) => {
  // fetch data
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json["results"]);
        setMoviesData(json["results"]);
      })
      .catch((e) => console.log(e));
  }, []);

  //function which will put favoris id into firestore
  const clickHandler = async (movieId) => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {favoris : arrayUnion(movieId)})
  };
  // return movie cards by iterating through data
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <p>{user?.email}</p>
        <p>{user?.uid}</p>
      </Form>
      <h1> Les plus populaires de l'histoire : </h1>
      {moviesData.map((d) => (
        <div>
          {" "}
          <MovieCard
            imageLink={getPosterUrl(d)}
            link={getLink(d)}
            title={d.title}
            date={d.release_date}
          />
          <Button type="primary" onClick={() => clickHandler(getId(d))}>
            Ajouter aux favoris
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PopularMovies;
