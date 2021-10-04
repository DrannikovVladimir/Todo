import { makeAutoObservable } from "mobx";
import ITodo from '../interfaces';

type Store = {
  status: string,
  todos: ITodo[],
  currentTodo: ITodo | null,
  initTodos(todos: ITodo[]): void,
  addTodo(todo: {}): void,
  removeTodo(id: number): void,
  doneTodo(id: number): void,
  openEditor(todo: ITodo): void,
  editedTodo(name: string): void,
  openRemoveConfirm(todo: ITodo): void,
  cancelEdit(): void,
}

const store: Store = makeAutoObservable({
  status: 'working',
  todos: [],
  currentTodo: null,
  initTodos: (todos) => {
    store.todos = todos;
  },
  addTodo: (todo: ITodo) => {
    store.todos = [todo, ...store.todos];
  },
  removeTodo: (id) => {
    store.todos = store.todos.filter((todo) => todo.id !== id);
    store.status = 'working';
  },
  doneTodo: (id) => {
    store.todos = store.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo;
    });
  },
  editedTodo: (name)=> {
    store.todos = store.todos.map((todo) => {
      if (todo.id === store.currentTodo!.id) {
        todo.name = name;
        return todo;
      }
      return todo;
    });
    store.status = 'working';
    store.currentTodo = null;
  },
  openEditor: (todo) => {
    store.status = 'editing';
    store.currentTodo = todo;
  },
  openRemoveConfirm: (todo) => {
    store.status = 'removing';
    store.currentTodo = todo;
  },
  cancelEdit: () => {
    store.status = 'working';
  }
});

export default store;
