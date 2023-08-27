import { useEffect, useState } from "react";
import { Results } from "./Results";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const search = async () => {
      const res = await fetch("/api/search");
      const data = await res.json();
      console.log("DATA SEARCH", data);
      setProperties(data.properties);
    };
    search();
  }, []);
  return (
    <div>
      <Results properties={properties} />
    </div>
  );
};
