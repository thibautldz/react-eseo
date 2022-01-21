import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";
import {
  doc,
  getDoc,
  addDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import MovieCard from "./components/MovieCard";
import { apiKey, base_uri, images_uri, getPosterUrl, getLink, getId, getMovieData} from "./components/movie_api";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

const Home = () => {
  const [favorites, setFavorites] = useState([{}]);
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("state = definitely signed in : ", user);
        var uid = user.uid;

        const getUserData = async () => {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var favoritesArray = [];
            docSnap.data().favoris.forEach((id) => {
              getMovieData(id).then((data) => {
                favoritesArray.push(data);
              });
            });
            setFavorites(favoritesArray);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        };
        getUserData();
      } else {
        console.log("state = definitely signed out");
      }
    });
  }, []);

  //const arrayfavoris = userfirestore.favoris;
  return (
    <div>
     {favorites.map((d) => (
        <div> <MovieCard imageLink={getPosterUrl(d)} link={getLink(d)} title={d.title} date={d.release_date} /></div>
      ))}
    </div>
  );
};
export default Home;
