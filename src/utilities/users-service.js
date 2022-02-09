import * as usersAPI from './users-api';

export async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  } catch {
  }
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem method will return null if there's no key
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(window.atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

/*-- This is not necessary in your MERN-Stack projects ---*/
/*-- It's only to see how to send a token to the server ---*/
export async function checkToken(){
  return new Date(await usersAPI.checkToken());
}