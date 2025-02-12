import { IoMdGrid } from "react-icons/io";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoGraph } from "react-icons/go";

const links = [
  { path: "/", icon: <GoGraph />, name: "Analytics" },
  { path: "/job-list", icon: <IoMdGrid />, name: "Job List" },
  { path: "/new-job", icon: <CgFileAdd />, name: "New Job" },
  { path: "/profile", icon: <MdOutlineAccountCircle />, name: "Profile" },
];

export { links };
