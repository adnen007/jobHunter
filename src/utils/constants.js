import { IoMdGrid } from "react-icons/io";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoGraph } from "react-icons/go";

const links = [
  { path: "/", icon: <GoGraph />, name: "Stats" },
  { path: "/all-jobs", icon: <IoMdGrid />, name: "All Jobs" },
  { path: "/add-job", icon: <CgFileAdd />, name: "Add Job" },
  { path: "/profile", icon: <MdOutlineAccountCircle />, name: "Profile" },
];

export { links };
