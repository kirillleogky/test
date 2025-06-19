export type Status = 'Working' | 'OnVacation' | 'LunchTime' | 'BusinessTrip';

export class Employee {
  id: number;
  name: string;
  status: Status;
  img: string;
}
