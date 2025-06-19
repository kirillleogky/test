import { type TEmployee } from "../../types";
import { EmployeeCard } from "../EmployeeCard/EmployeeCard";
import styles from "./EmployeeList.module.css";
import { memo } from "react";

interface IEmployeeListProps {
  employees: TEmployee[];
  onRefresh: () => void;
}

const EmployeeList = memo<IEmployeeListProps>(({ employees, onRefresh }) => {
  if (employees.length === 0) {
    return <p className={styles.empty}>No employees found.</p>;
  }

  return (
    <div className={styles.grid}>
      {employees.map((emp) => (
        <EmployeeCard key={emp.id} employee={emp} onUpdate={onRefresh} />
      ))}
    </div>
  );
});

export { EmployeeList };
