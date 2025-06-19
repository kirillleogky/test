import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Employee[] {
    return this.usersService.findAll();
  }

  @Post(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Employee[] {
    return this.usersService.updateStatus(id, dto);
  }

  @Post()
  addUser(@Body() createDto: CreateEmployeeDto): Employee {
    return this.usersService.create(createDto);
  }
}