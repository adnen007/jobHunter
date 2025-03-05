import axios from "axios";

export const convertToPath = (obj) => {
  let arr = Object.entries(obj);
  arr = arr.filter((el) => {
    if (!el[1]) {
      return false;
    }
    return true;
  });
  arr = arr.map((el) => {
    return el.join("=");
  });
  return arr.join("&");
};

export const convertSecondsToDate = (createAt) => {
  const milliseconds = createAt.seconds * 1000 + createAt.nanoseconds / 1e6;
  const date = new Date(milliseconds);
  return date.toDateString();
};

export const getUserFromLocalStorage = () => {
  if (localStorage.user_data) {
    const user_data = JSON.parse(localStorage.user_data);

    axios.defaults.headers.common["Authorization"] = `Bearer ${user_data.token}`;

    return user_data;
  }
  return {};
};
