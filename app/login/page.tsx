'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//Firebase
import { auth, userExist } from '../../firebase/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

type UserInfoProps = {
  user: {
    displayName: string;
    photoURL: string;
  };
  onLogout: () => void;
};

//Componente para Displayar User Info.
const UserInfo = ({ user, onLogout }: UserInfoProps) => {
  return (
    <div>
      <h1>Bienvenido, {user.displayName}</h1>
      <Image
        src={user.photoURL}
        alt='User Avatar'
        width={50}
        height={50}
      />
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

const Login = () => {
  //Creamos estados, uno es null o usuario.
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  //Le pasamos a Firebase nuestro auth y nos da un user, si hay user se lo damos a CurrentUser - y ponemos loading en false.
  useEffect(() => {
    //Auth es un observador, nos muestra si ya esta logeado o no, a este le debemos la persistencia. Si esta logeado nos pasa user, si no, no pasa nada.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    //Limpieza.
    return () => unsubscribe();
  }, []);

  //USER - DB
  const handleUserStateChanged = async (user: any) => {
    if (user) {
      const isRegistered = await userExist(user.id);
      if (isRegistered) {
        console.log('Estas Registrado');
      } else {
        console.log('No estas registrado');
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  //GOOGLE
  const handleSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      //Mostramos Popup, le pasamos nuestro auth y el Provider.
      const res = await signInWithPopup(auth, googleProvider);
      //Guardamos user.
      setCurrentUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      //Usamos signOut, y vaciamos nuestro user.
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {currentUser ? (
        <UserInfo
          user={currentUser}
          onLogout={handleLogout}
        />
      ) : (
        <div>
          <h1>Inicia sesión</h1>
          <button onClick={handleSignInWithGoogle}>Ingresar con Google</button>
        </div>
      )}
    </div>
  );
};

export default Login;
