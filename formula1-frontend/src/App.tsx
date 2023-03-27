import React from "react";

import { DriverList } from "./components/DriverList";
import { Header } from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <DriverList />
    </>
  );
};

export default App;
