import React, { useEffect, useState } from "react";
import API from "../api";

export default function DashboardPage() {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    API.get("api/accounts/dashboard/").then(res => setMsg(res.data.message));
  }, []);
  return <h2>{msg}</h2>;
}