import { memo } from "react";
import styles from "./Toolbar.module.css";
import { Search } from "lucide-react";
import { type TStatus } from "../../types";

interface IToolbarProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  filterValue: TStatus | "";
  onFilterChange: (v: TStatus | "") => void;
  onCreate: () => void;
}

export const Toolbar = memo<IToolbarProps>(
  ({ searchValue, onSearchChange, filterValue, onFilterChange, onCreate }) => {
    return (
      <div className={styles.toolbar}>
        <button className={styles.createBtn} onClick={onCreate}>
          Create&nbsp;<span className={styles.plus}>＋</span>
        </button>

        <div className={styles.searchFilterBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.search}
            placeholder="Type to search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <select
            className={styles.filter}
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value as TStatus)}
          >
            <option value="">Filter by status</option>
            <option value="Working">Working</option>
            <option value="OnVacation">On Vacation</option>
            <option value="LunchTime">LunchTime</option>
            <option value="BusinessTrip">Business Trip</option>
          </select>
        </div>
      </div>
    );
  },
);
