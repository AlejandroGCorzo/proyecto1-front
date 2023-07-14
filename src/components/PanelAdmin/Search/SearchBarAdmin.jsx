import React from "react";
import ServerError from "../../../utils/ServerError";

const SearchBarAdmin = ({ searchValue, setSearchValue, error = null }) => {
  return (
    <div className="form-control w-2/3 md:w-1/3 ">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-full md:w-auto mb-1 focus-visible:outline-none bg-header/90"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus
      />
      {error?.length > 0 && <ServerError error={error} />}
    </div>
  );
};

export default SearchBarAdmin;
