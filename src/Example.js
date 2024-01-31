import { Button } from "@nextui-org/react";
import React, { useState } from "react";

function Example() {
  // State to track whether the second column is visible or not
  const [secondColumnVisible, setSecondColumnVisible] = useState(true);

  // Function to toggle the visibility of the second column
  const toggleSecondColumn = () => {
    setSecondColumnVisible(!secondColumnVisible);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="bg-purple-700">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
      {/* Second column with conditional visibility */}
      <div className={`sm:block ${secondColumnVisible ? "block" : "hidden"}`}>
        asd
      </div>
      {/* Button to toggle visibility on small screens */}
      <button
        className="sm:hidden bg-blue-500 text-white py-2 px-4 rounded"
        onClick={toggleSecondColumn}
      >
        Toggle Second Column
      </button>
      <Button color="primary">Ehey</Button>
    </div>
  );
}

export default Example;
