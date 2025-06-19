import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class UsersService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John',
      status: 'Working',
      img: 'https://images.unsplash.com/photo-1709746459902-a366cad70327?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Jack',
      status: 'Working',
      img: 'https://images.unsplash.com/photo-1606002830191-c1b4f20e6cda?q=80&w=3765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Sheli',
      status: 'Working',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      name: 'Eitan',
      status: 'Working',
      img: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  findAll(): Employee[] {
    return this.employees;
  }

  updateStatus(id: number, dto: UpdateStatusDto): Employee[] {
    const emp = this.employees.find((e) => e.id === id);
    if (!emp) throw new NotFoundException('Employee not found');
    emp.status = dto.status;
    return this.employees;
  }

  create(createDto: CreateEmployeeDto): Employee {
    const nextId = Math.max(...this.employees.map(e => e.id)) + 1;
    const newEmp: Employee = { id: nextId, ...createDto };
    this.employees.push(newEmp);
    return newEmp;
  }
}