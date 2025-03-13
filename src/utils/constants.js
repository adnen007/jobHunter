import { IoMdGrid } from "react-icons/io";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

const links = [
  { path: "/", icon: <SlGraph />, name: "Analytics" },
  { path: "/job-list", icon: <IoMdGrid />, name: "Job List" },
  { path: "/new-job", icon: <CgFileAdd />, name: "New Job" },
  { path: "/profile", icon: <MdOutlineAccountCircle />, name: "Profile" },
];

export { links };
