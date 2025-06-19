import React, { memo, useState, useTransition } from "react";
import { X } from "lucide-react";
import { type TEmployeePayload, type TStatus } from "../../types";
import styles from "./AddUserForm.module.css";
import { STATUS_LABELS, statuses } from "../../constants/status.ts";

interface IAddUserFormProps {
  onAdd: (emp: TEmployeePayload) => Promise<void>;
  onClose: () => void;
}

const AddUserForm = memo<IAddUserFormProps>(({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState<TStatus>("Working");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !img.trim()) {
      setError("Name and Image URL are required");
      return;
    }
    startTransition(async () => {
      try {
        await onAdd({ name: name.trim(), img: img.trim(), status });

        onClose();
      } catch (err) {
        if (err instanceof Error) {
          setError(err?.message);
        }
        setError("Failed to add user");
      }
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.title}>Add Employee</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Name"
            />
          </label>
          <label className={styles.label}>
            Image URL
            <input
              id="img"
              name="img"
              type="url"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className={styles.input}
              placeholder="Image URL"
            />
          </label>
          <label className={styles.label}>
            Status
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TStatus)}
              className={styles.select}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending ? "Adding…" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
});

export { AddUserForm };
