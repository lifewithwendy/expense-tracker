import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
// } from "@/components/ui/card";
} from "./components/ui/card";

// import { api } from '@/lib/api';
import { api } from './lib/api';

import './App.css';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    const fetchTotalSpent = async () => {
      // const response = await fetch("/api/expenses/totalSpent");
      const response = await api.expenses['totalSpent'].$get();
      const data = await response.json();
      // console.log(data);
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  },[])
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>The total amount you spent is : </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
