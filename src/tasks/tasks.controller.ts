import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  addProduct(
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
  ) {
    const generatedId = this.tasksService.insertTask(
      taskTitle,
      taskDescription,
      'user2',
    );
    return { id: generatedId };
  }

  @Get()
  getAllTasks() {
    return { tasks: this.tasksService.getTasks() };
  }

  @Get(':id')
  getSingleTask(@Param('id') productId: string) {
    return this.tasksService.getTask(productId);
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body('status') taskStatus: 1 | 2 | 3 | 4 | 5,
    @Body('updatedBy') updatedBy: string,
  ) {
    this.tasksService.updateTask(taskId, updatedBy, taskStatus);
  }

  @Delete(':id')
  removeTask(@Param('id') taskId: string) {
    this.tasksService.deleteTask(taskId);
  }
}
