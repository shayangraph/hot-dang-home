import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [toalResults, setToalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();

  const search = async () => {
    const { page } = queryString.parse(window.location.search);
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
      }),
    });
    const data = await res.json();
    console.log("DATA SEARCH", data);
    setProperties(data.properties);
    setToalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  useEffect(() => {
    search();
  }, []);
  return (
    <div>
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(toalResults / pageSize)}
      />
    </div>
  );
};
