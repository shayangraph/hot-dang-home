import { useState } from "react";
import { Input } from "components/Input";

export const Filters = ({ onSearch }) => {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md">
      <div className="flex-1">
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={hasParking}
              onChange={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={petFriendly}
              onChange={() => setPetFriendly((value) => !value)}
            />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <span>Min price</span>
        <Input
          type="number"
          checked={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex-1">
        <span>Max price</span>
        <Input
          type="number"
          checked={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <div className="btn" onClick={handleSearch}>
          Search
        </div>
      </div>
    </div>
  );
};
