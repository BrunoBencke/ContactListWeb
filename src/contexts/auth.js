import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem('user_token');
    const usersStorage = localStorage.getItem('users_bd');

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  async function signin(email, password) {
    const data = { email: email, password: password };
    var status = false;

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    };

    await fetch(process.env.REACT_APP_BASE_URL + '/login', requestInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return;
      })
      .then((token) => {
        if (token) {
          localStorage.setItem('user_token', token.access_token);
          setUser({ email, password });
          status = true;
          return;
        }
        return;
      })
      .catch((e) => {
        return;
      });

    return status;
  }

  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem('users_bd'));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return 'Já existe uma conta com esse E-mail';
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem('users_bd', JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('user_token');
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
