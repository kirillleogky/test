type TNullable<T> = T | null;

type TStatus = 'Working' | 'OnVacation' | 'LunchTime' | 'BusinessTrip';

type TEmployee = {
  id: number;
  name: string;
  status: TStatus;
  img: string;
}

type TEmployeePayload = Omit<TEmployee, 'id'>;

export { type TNullable, type TStatus, type TEmployee, type TEmployeePayload };