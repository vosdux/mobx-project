import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTodos() {
    this.loading = true;
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
      runInAction(() => {
        this.todos = res.data.map((t: any) => ({
          id: t.id,
          text: t.title,
          completed: t.completed,
        }));
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addTodo(text: string) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: text,
      completed: false,
    });
    runInAction(() => {
      this.todos.push({
        id: res.data.id || Date.now(),
        text,
        completed: false,
      });
    });
  }

  async updateTodo(id: number, data: Partial<Todo>) {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title: data.text,
      completed: data.completed,
    });
    runInAction(() => {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        if (data.text !== undefined) todo.text = data.text;
        if (data.completed !== undefined) todo.completed = data.completed;
      }
    });
  }

  async removeTodo(id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    runInAction(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      this.updateTodo(id, { completed: !todo.completed });
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
} 