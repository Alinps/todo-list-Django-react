// export const setToken = (token) => {
//   localStorage.setItem('access', token.access);
//   localStorage.setItem('refresh', token.refresh);
// };

// export const getAccessToken = () => localStorage.getItem('access');
// export const getRefreshToken = () => localStorage.getItem('refresh');

// export const clearTokens = () => {
//   localStorage.removeItem('access');
//   localStorage.removeItem('refresh');
// };


export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};

