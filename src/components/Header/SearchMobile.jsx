import React from "react";
import { IoIosSearch } from "react-icons/io";
import SearchItems from "../../utils/SearchItems";

const SearchBar = ({
  isSearchOpen,
  toggleSearchBar,
  searchValue,
  setSearchValue,
  showItems,
  setShowItems,
}) => {
  return (
    <div
      className={`fixed inset-0 flex flex-1 z-[9999] justify-center lg:hidden ${
        isSearchOpen ? "flex" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="flex flex-col justify-start items-center transform transition-transform duration-300 ease-in-out w-full">
        <button
          className="text-white focus:outline-none pt-8 pr-8 flex self-end"
          onClick={toggleSearchBar}
        >
          <svg
            className="h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.348 14.849a.5.5 0 0 1-.707 0L10 10.708l-3.646 3.647a.5.5 0 1 1-.708-.708L9.292 10l-3.647-3.646a.5.5 0 1 1 .708-.708L10 9.292l3.646-3.647a.5.5 0 0 1 .708.708L10.708 10l3.647 3.646a.5.5 0 0 1 0 .708z"
            />
          </svg>
        </button>
        <div className="flex bg-nav w-2/3 pr-2">
          <input
            type="text"
            name="search"
            id="searchMobile"
            className="bg-nav text-white w-full p-2 border-nav focus:border-nav
              focus:outline-none
              appearance-none
              "
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          {!searchValue.length ? (
            <button>
              <IoIosSearch color="white" fontSize={32} />
            </button>
          ) : (
            <button
              onClick={() => setSearchValue("")}
              className="p-1 text-white text-xl"
            >
              X
            </button>
          )}
        </div>
        {showItems && (
          <SearchItems showItems={showItems} setShowItems={setShowItems} />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
