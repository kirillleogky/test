import { memo, useState } from "react";
import { type TEmployee, type TStatus } from "../../types";
import styles from "./EmployeeCard.module.css";
import { useUpdateUserStatus } from "../../hooks/useUpdateUserStatus.ts";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  statuses,
} from "../../constants/status.ts";

interface IEmployeeCardProps {
  employee: TEmployee;
  onUpdate: () => void;
}

const EmployeeCard = memo<IEmployeeCardProps>(({ employee, onUpdate }) => {
  const [newStatus, setNewStatus] = useState<TStatus>(employee.status);
  const { update } = useUpdateUserStatus();

  const apply = async () => {
    await update(employee.id, newStatus);

    onUpdate();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <img src={employee.img} alt={employee.name} className={styles.avatar} />
        <div className={styles.info}>
          <h2 className={styles.name}>{employee.name}</h2>
          <div className={styles.statusRow}>
            <div className={styles.statusContent}>
              <span
                className={styles.dot}
                style={{ backgroundColor: STATUS_COLORS[newStatus] }}
              />
              <div className={styles.selectWrapper}>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as TStatus)}
                  className={styles.select}
                >
                  {statuses.map((statusKey) => (
                    <option key={statusKey} value={statusKey}>
                      {STATUS_LABELS[statusKey]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={apply} className={styles.apply}>
        Apply
      </button>
    </div>
  );
});

export { EmployeeCard };
