import { Injectable, NotFoundException } from '@nestjs/common';

import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  insertTask(title: string, description: string, createdBy: string) {
    const taskId = Math.random().toString();
    const newTask = new Task(
      taskId,
      title,
      description,
      createdBy,
      1,
      createdBy,
    );

    this.tasks.push(newTask);
    return taskId;
  }

  getTasks() {
    return [...this.tasks];
  }

  getTask(taskId: string) {
    const task = this.findTask(taskId);
    return { ...task[0] };
  }

  updateTask(taskId: string, updateBy: string, status: 1 | 2 | 3 | 4 | 5) {
    const { 0: task, 1: taskIndex } = this.findTask(taskId);
    if (status - task.status !== 1 && status - task.status !== -1) {
      throw new NotFoundException(`Please move it one step at a time`);
    }
    this.tasks[taskIndex] = { ...task, status: status, updatedBy: updateBy };
    return null;
  }

  deleteTask(taskId) {
    const { 1: taskIndex } = this.findTask(taskId);
    this.tasks.splice(taskIndex, 1);
  }

  private findTask(id: string): [Task, number] {
    const task = this.tasks.find((tk) => tk.id === id);
    const taskIndex = this.tasks.findIndex((tk) => tk.id === id);
    if (!task) {
      throw new NotFoundException(`couldn't find this task`);
    }
    return [task, taskIndex];
  }
}
