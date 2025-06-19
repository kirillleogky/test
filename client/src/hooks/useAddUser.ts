import { useCallback, useState } from "react";
import { addEmployee as apiAddEmployee } from "../api";
import type { TEmployee, TEmployeePayload, TNullable } from "../types";

const useAddUser = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<Error | null>(null);

  const add = useCallback(
    async (data: TEmployeePayload): Promise<TNullable<TEmployee>> => {
      setIsAdding(true);
      setAddError(null);

      let result: TNullable<TEmployee> = null;

      try {
        const response = await apiAddEmployee(data);
        result = response.data;
      } catch (err) {
        setAddError(err as Error);
      } finally {
        setIsAdding(false);
      }
      return result;
    },
    [],
  );

  return { add, isAdding, addError };
};

export { useAddUser };
