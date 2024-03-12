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

export const convertTime = (time) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let newTime = time.slice(0, 10);
  const year = newTime.slice(0, 4);
  const month = newTime.slice(5, 7);
  const day = newTime.slice(8, 10);

  return `${months[+month]} ${day}, ${year}`;
};

export const getUserFromLocalStorage = () => {
  if (localStorage.user_data) {
    const user_data = JSON.parse(localStorage.user_data);

    axios.defaults.headers.common["Authorization"] = `Bearer ${user_data.token}`;

    return user_data;
  }
  return {};
};
