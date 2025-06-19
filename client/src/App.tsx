import { useCallback, useState } from "react";
import { type TEmployeePayload, type TStatus } from "./types";
import { EmployeeList } from "./components/EmployeeList/EmployeeList";
import { AddUserForm } from "./components/AddUserForm/AddUserForm";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { ContentWrapper } from "./components/ContentWrapper/ContentWrapper";
import { useUsers } from "./hooks/useUsers";
import { useAddUser } from "./hooks/useAddUser.ts";
import styles from "./App.module.css";
import { useDebouncedValue } from "./hooks/useDebouncedValue.ts";

const App = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TStatus | "">("");
  const [showForm, setShowForm] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isLoading, error, refetch } = useUsers(filter, debouncedSearch);

  const { add: addUser, isAdding, addError } = useAddUser();

  const handleCreateUserModal = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleCloseCreateUserModal = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleAdd = useCallback(
    async (emp: TEmployeePayload) => {
      await addUser(emp);
      refetch();
      handleCloseCreateUserModal();
    },
    [addUser, refetch, handleCloseCreateUserModal],
  );

  if (isLoading || isAdding) return <p className={styles.center}>Loading…</p>;

  if (error || addError)
    return (
      <p className={styles.center}>
        Error: {error ? error?.message : addError?.message}
      </p>
    );

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Employees</h1>
        <button className={styles.logout}>Log Out</button>
      </header>

      <ContentWrapper>
        <Toolbar
          searchValue={search}
          onSearchChange={setSearch}
          filterValue={filter}
          onFilterChange={setFilter}
          onCreate={handleCreateUserModal}
        />

        {showForm && (
          <AddUserForm onAdd={handleAdd} onClose={handleCloseCreateUserModal} />
        )}

        <EmployeeList employees={data} onRefresh={refetch} />
      </ContentWrapper>
    </div>
  );
};

export default App;
