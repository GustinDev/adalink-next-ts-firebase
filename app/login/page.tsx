'use client';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Image from 'next/image';

type UserInfoProps = {
  user: {
    displayName: string;
    photoURL: string;
  };
  onLogout: () => void;
};

type User = {
  displayName: string;
  photoURL: string;
};

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
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Limpieza de suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setCurrentUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
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
