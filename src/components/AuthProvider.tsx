import React, { useMemo, useState, useEffect } from 'react';
import {User} from '../types/User'


const AuthContext = React.createContext({
  loading:false,
  currentUser: null as User | null,
  isChecked: false,
  login: async(name:string)=>{},
  logout:async()=>{}



})

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('currentUser')

  if (saved) {
    setCurrentUser(JSON.parse(saved))
  }



  },[])

async function logout() {
  setLoading(true)
  try{localStorage.removeItem('currentUser');
    setCurrentUser(null)}catch{}finally{setLoading(false)}

  }

  const value = useMemo(
    () => ({

      currentUser, setCurrentUser, logout, loading, setLoading,
    }),
    [currentUser,setCurrentUser,loading,setLoading],
  );
  return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext);
