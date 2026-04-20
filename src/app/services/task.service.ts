import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { RouterTestingHarness } from '@angular/router/testing';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  constructor(){ }

  private tasks: Array<Task> = [];

  public getTasks(): Array<Task>  {

    this.tasks = this.getFromLocalStrorage();

    return this.tasks;
  }

  public getById(id: number): Task | undefined{

    const task = this.tasks.find(c => c.id === id);

    return task;
  }

  public addTask(task: Task){

    task.id = this.tasks.length + 1;

    this.tasks.push(task);

    this.saveToLocalStrorage();
  }

  public updateTasks(){
    this.saveToLocalStrorage();
  }

  public removeTask(task: Task) {
    const index = this.tasks.indexOf(task);

    if(index !== -1){
      //Achou
      this.tasks.splice(index, 1);

      this.saveToLocalStrorage();
    }
  }

  private saveToLocalStrorage(){

    const tasksJSON = JSON.stringify(this.tasks);

    localStorage.setItem('tasks', tasksJSON);
  }

  private getFromLocalStrorage(): Array<Task> {

    const tasksJSON = localStorage.getItem('tasks');

    if(!tasksJSON){
      //nao achou
      return new Array<Task>();
    }

    return JSON.parse(tasksJSON);
  }
}
export { Task };
