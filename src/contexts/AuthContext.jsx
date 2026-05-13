// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { getToken, removeToken, setToken } from '../utils/token';
// import { decodeToken } from '../utils/jwtUtils';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const initAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const data = await validateToken();
//           setUser({ 
//             email: data.email, 
//             role: data.role,
//             status: data.status
//           });
//           setIsAuthenticated(true);
//         } catch (err) {
//           localStorage.removeItem('token');
//           localStorage.removeItem('email');
//           localStorage.removeItem('role');
//           localStorage.removeItem('status');
//         }
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);

//   const login = (token) => {
//     if (token) {
//       setToken(token);
//       const decoded = decodeToken();
//       if (decoded) {
//         setIsAuthenticated(true);
//         setUser(decoded);
//       }
//     }
//   };

//   const logoutUser = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('email');
//     localStorage.removeItem('role');
//     localStorage.removeItem('status');
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, loading, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
 
const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  // useEffect(() => {
  //   const initAuth = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         const data = await validateToken();
  //         setUser({
  //           email: data.email,
  //           role: data.role,
  //           status: data.status
  //         });
  //         setIsAuthenticated(true);
  //       } catch (err) {
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('email');
  //         localStorage.removeItem('role');
  //         localStorage.removeItem('status');
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   initAuth();
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
 
    if (token) {
      // ✅ Restore user FROM localStorage (no API call)
      setUser({
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        status: localStorage.getItem('status'),
      });
 
      setIsAuthenticated(true);
    }
 
    setLoading(false);
  }, []);
 
  const loginUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('role', data.role);
    localStorage.setItem('status', data.status);
    setUser({
      email: data.email,
      role: data.role,
      status: data.status
    });
    setIsAuthenticated(true);
  };
 
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('status');
    setUser(null);
    setIsAuthenticated(false);
  };
 
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useAuth = () => useContext(AuthContext);