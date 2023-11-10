// useDataFilter.ts
import { useState } from "react";

const useDataFilter = (initialData: TodoList) => {
  const [filteredData, setFilteredData] = useState(initialData);

  const filterData = (data: TodoList, value: string) => {
    let result;

    if (value === "!done") {
      result = data.filter((v) => !v.done);
    } else if (value === "done") {
      result = data.filter((v) => v.done);
    } else {
      result = data.filter((v) => v.important);
    }

    setFilteredData(result);
  };

  return { filteredData, filterData };
};

export default useDataFilter;
