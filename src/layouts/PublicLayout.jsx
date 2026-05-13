import { Outlet } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";

export default function PublicLayout() {
  return (
    <>
      <HomeNavbar />
      <Outlet />
    </>
  );
}