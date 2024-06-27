import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "react-data-table-component";
import axios from "axios";

function App() {
  const [allData, setAllData] = useState<user[]>([]);

  interface user {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  }

  interface Column {
    name: string;
    selector?: (row: user) => string | number;
    cell?: (row: user) => React.ReactNode;
    sortable?: boolean;
  }

  const columns: Column[] = [
    {
      name: "Name",
      cell: (row: user) => <div>{row.name}</div>,
    },
    {
      name: "Email",
      cell: (row: user) => <div>{row.email}</div>,
    },
    {
      name: "Gender",
      cell: (row: user) => <div>{row.gender}</div>,
    },
    {
      name: "Status",
      cell: (row: user) => <div>{row.status}</div>,
    },
  ];

  const getAllUserList = () => {
    axios.get("http://localhost:8000/user").then((response) => {
      setAllData(response.data);
    });
  };

  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <div className="App">
      <DataTable columns={columns} data={allData} />
    </div>
  );
}

export default App;
