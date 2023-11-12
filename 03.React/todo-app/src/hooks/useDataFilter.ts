// useDataFilter.ts
import { useState } from "react";

const useDataFilter = (initialData: TodoList) => {
  const [filteredData, setFilteredData] = useState(initialData);

  const filterData = (data: TodoList, value: string) => {
    let result;

    if (value === "all") {
      result = data;
    } else if (value === "!done") {
      result = data.filter((val) => !val.done);
    } else if (value === "done") {
      result = data.filter((val) => val.done);
    } else if (value === "important") {
      result = data.filter((val) => val.important);
    }

    setFilteredData(result!);
  };

  return { filteredData, filterData };
};

export default useDataFilter;
