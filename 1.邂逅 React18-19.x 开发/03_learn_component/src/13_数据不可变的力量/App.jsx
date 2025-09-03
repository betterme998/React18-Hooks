import React, { PureComponent } from "react";

// 过时的API
export class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      books: [
        { name: "book1", price: 99, count: 1 },
        { name: "book2", price: 199, count: 2 },
        { name: "book3", price: 299, count: 3 },
        { name: "book4", price: 399, count: 4 },
      ],
    };
  }
  // 点击添加书籍
  addNewBook() {
    const newBook = { name: "book5", price: 349, count: 4 };
    // 不要自接修改state当中的引用类型，而是创建一个新的对象
    const books = [...this.state.books, newBook];
    console.log("books", books);

    this.setState({ books: books });
  }
  // 点击添加书籍数量
  addBookCount(index) {
    // 创建新数组
    const books = [...this.state.books];
    books[index].count++;
    // 保证render函数重新执行，这里的books是新数组，不能直接用this.state.books[index].count++

    this.setState({ books: books });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <h2>书籍列表</h2>
        <ul>
          {books.map((item, index) => {
            return (
              <li key={item.name}>
                <span>
                  name:{item.name}-price:{item.price}-count:{item.count}
                  <button onClick={(e) => this.addBookCount(index)}>+1</button>
                </span>
              </li>
            );
          })}
        </ul>
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}

export default App;
