import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Paginatio } from "./Pagination";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [toalResults, setToalResults] = useState(0);
  const pageSize = 3;

  useEffect(() => {
    const search = async () => {
      const res = await fetch("/api/search");
      const data = await res.json();
      console.log("DATA SEARCH", data);
      setProperties(data.properties);
      setToalResults(data.total);
    };
    search();
  }, []);
  return (
    <div>
      <Results properties={properties} />
      <Paginatio totalPages={Math.ceil(toalResults / pageSize)} />
    </div>
  );
};
