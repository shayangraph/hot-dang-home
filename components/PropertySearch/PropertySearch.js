import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [toalResults, setToalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();

  const search = async () => {
    const { page, petFriendly, hasParking, minPrice, maxPrice } =
      queryString.parse(window.location.search);
    const filters = {};
    if (minPrice) {
      filters.minPrice = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = parseInt(maxPrice);
    }
    if (hasParking === "true") {
      filters.hasParking = true;
    }
    if (petFriendly === "true") {
      filters.petFriendly = true;
    }
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters,
      }),
    });
    const data = await res.json();
    console.log("DATA SEARCH", data);
    setProperties(data.properties);
    setToalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const { petFriendly, hasParking, minPrice, maxPrice } = queryString.parse(
      window.location.search
    );

    await router.push(
      `${router.query.slug.join("/")}?page=${pageNumber}&petFriendly=${
        petFriendly == "true"
      }&hasParking=${
        hasParking == "true"
      }&minPrice=${minPrice}&maxPrice=${maxPrice}`,
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

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    //Update browser url
    console.log("FILTERS", petFriendly, hasParking, minPrice, maxPrice);
    await router.push(
      `${router.query.slug.join(
        "/"
      )}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      null,
      {
        shallow: true,
      }
    );
    search();
  };

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(toalResults / pageSize)}
      />
    </div>
  );
};
