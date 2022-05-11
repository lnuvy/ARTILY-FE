const getToken = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};

const insertToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { getToken, insertToken, removeToken };
