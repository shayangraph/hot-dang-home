import { useEffect } from "react";

export const PropertySearch = () => {
  useEffect(() => {
    const search = async () => {
      const res = await fetch('/api/search');
      const data = await res.json();
      console.log("DATA SEARCH", data);
    };
    search();
  }, []);
  return <div>Propery search</div>;
};
