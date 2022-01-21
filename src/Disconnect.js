import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";


const Disconnect = () => {
    useEffect(() => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Disconnected")
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
        , []
    );
    
    return (
        <div>Déconnecté avec succès.</div>
    )
}

export default Disconnect;
