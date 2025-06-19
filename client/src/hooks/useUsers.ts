import { useState, useMemo, useCallback } from "react";
import { useFetchData } from "./useFetchData";
import { type TEmployee, type TStatus } from "../types";
import { getUsersUrl } from "../api";

const useUsers = (filter: "" | TStatus, name: string) => {
  const [reloadIndex, setReloadIndex] = useState<number>(0);

  const url = getUsersUrl(reloadIndex);

  const { data: rawData, isLoading, error } = useFetchData<TEmployee[]>(url);

  const refetch = useCallback(() => {
    setReloadIndex((prev) => prev + 1);
  }, []);

  const data = useMemo(() => {
    if (!rawData) return [];
    return rawData
      .filter((emp) => !filter || emp.status === filter)
      .filter((emp) => emp.name.toLowerCase().includes(name.toLowerCase()));
  }, [rawData, filter, name]);

  return { data, isLoading, error, refetch };
};

export { useUsers };
