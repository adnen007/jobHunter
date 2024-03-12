import { ImStatsDots } from "react-icons/im";
import { MdOutlineQueryStats } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { ImProfile } from "react-icons/im";

const links = [
  { path: "/", icon: <ImStatsDots />, name: "Stats" },
  { path: "/all-jobs", icon: <MdOutlineQueryStats />, name: "All Jobs" },
  { path: "/add-job", icon: <AiOutlineProfile />, name: "Add Job" },
  { path: "/profile", icon: <ImProfile />, name: "Profile" },
];

export { links };
