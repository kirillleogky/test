import { Status } from '../entities/employee.entity';

export class CreateEmployeeDto {
  readonly name: string;
  readonly status: Status;
  readonly img: string;
}
