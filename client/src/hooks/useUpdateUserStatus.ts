import { useCallback, useState } from "react";
import type { TEmployee, TNullable, TStatus } from "../types.ts";
import { updateEmployeeStatus as apiUpdateStatus } from "../api";

const useUpdateUserStatus = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<TNullable<Error>>(null);

  const update = useCallback(
    async (id: number, status: TStatus): Promise<TNullable<TEmployee[]>> => {
      setIsUpdating(true);
      setUpdateError(null);

      let result: TNullable<TEmployee[]> = null;

      try {
        const response = await apiUpdateStatus(id, status);

        result = response.data;
      } catch (err) {
        setUpdateError(err as Error);
      } finally {
        setIsUpdating(false);
      }

      return result;
    },
    [],
  );

  return { update, isUpdating, updateError };
};

export { useUpdateUserStatus };
