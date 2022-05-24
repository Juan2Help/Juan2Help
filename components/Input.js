import { useJsApiLoader } from "@react-google-maps/api";
import Script from "next/script";
import React from "react";
import { MdSearch } from "react-icons/md";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";
import { useRecoilState } from "recoil";
import { placesScript } from "../atoms/scriptsAtom";

function Input({
  id,
  name,
  type,
  autoComplete,
  required,
  placeholder,
  hasError,
  onChange,
  defaultValue,
  isLocation = false,
  value,
  onSelect,
}) {
  const fail =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md font-medium focus:ring-red-500 focus:outline-none focus:border-red-500 block w-full px-4 py-3 dark:bg-red-100 dark:border-red-400 focus:border-purple-700 focus:z-10";
  const nofail =
    "appearance-none relative block w-full px-2 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-purple-700 focus:border-purple-700 focus:z-10 sm:text-sm";
  let variant = hasError ? fail : nofail;
  let isClicked = false;

  const [placesLoaded, setPlacesLoaded] = useRecoilState(placesScript);

  return (
    <>
      {!placesLoaded && (
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD0aFIFNCP1-7FKoikAz1pHE33zS1FHn9I&libraries=places"
          strategy="beforeInteractive"
          onLoad={() => setPlacesLoaded(true)}
        ></Script>
      )}
      {isLocation ? (
        <div>
          <span className="font-bold text-md">Location</span>
          <PlacesAutocomplete
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            googleCallbackName="myCallbackFunc"
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: isClicked ? nofail : variant,
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.id}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      ) : (
        <div>
          <label htmlFor={name} className="sr-only">
            {placeholder}
          </label>
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            required={required}
            className={!isClicked ? variant : nofail}
            placeholder={placeholder}
            onClick={() => {
              isClicked = !isClicked;
            }}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </div>
      )}
    </>
  );
}

function TextArea({
  id,
  name,
  autoComplete,
  required,
  placeholder,
  hasError,
  rows,
  onChange,
  defaultValue,
}) {
  const fail =
    "resize-none bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md font-medium focus:ring-red-500 focus:outline-none focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400 focus:border-purple-700 focus:z-10";
  const nofail =
    "resize-none appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-purple-700 focus:border-purple-700 focus:z-10 sm:text-sm";
  let variant = hasError ? fail : nofail;
  let isClicked = false;

  return (
    <div>
      <textarea
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={!isClicked ? variant : nofail}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function Date({ handleChange, defaultValue }) {
  return (
    <div className="w-full flex flex-row space-x-4">
      <div className="flex-1 space-y-2">
        <span className="font-bold text-md">Start date</span>
        <Input
          type="date"
          name="startDate"
          onChange={handleChange}
          defaultValue={defaultValue?.startDate}
        />
      </div>
      <div className="flex-1 space-y-2">
        <span className="font-bold text-md">End date</span>
        <Input
          type="date"
          name="endDate"
          onChange={handleChange}
          defaultValue={defaultValue?.endDate}
        />
      </div>
    </div>
  );
}

function SearchBar({ handleChange,text }) {
  return (
    <div className="w-full flex flex-row rounded-md border border-gray-300 hover:border-purple-700 bg-white">
      <div className="relative px-2 pt-2.5">
        <MdSearch className="text-2xl text-gray-600" />
      </div>
      <div className="w-full">
        <input
          className="relative block w-full py-3 placeholder-gray-400 text-gray-900 font-medium rounded-md sm:text-sm focus:outline-none"
          type="text"
          name="searchbar"
          value = {text}
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
export { Input, TextArea, Date, SearchBar };
