import React, { PureComponent, createRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./style.css";
/*
TransitionGroup
有一组数据是使用的动画
*/

export class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      books: [
        { name: "《你不知道的JavaScript》", id: 1 },
        { name: "JS高级程序设计", id: 2 },
        { name: "《VueJS高级设计》", id: 3 },
      ],
    };
    // 使用createRef创建一个ref数组，用于保存每个li的ref
    this.booksRefs = {};
  }

  getItemRef = (id) => {
    if (!this.booksRefs[id]) {
      this.booksRefs[id] = createRef();
    }
    return this.booksRefs[id];
  };
  removeBook(index) {
    // 删除书籍
    const books = [...this.state.books];
    books.splice(index, 1);
    this.setState({ books }, () => {
      console.log(this.state.books);
    });
    // 这里需要清除对应的ref
    const bookId = books[index]?.id;

    if (bookId && this.booksRefs[bookId]) {
      delete this.booksRefs[bookId];
    }
    console.log(this.booksRefs);
  }

  addNewBook() {
    const books = [...this.state.books];
    books.push({
      name: "《ReactJS》",
      id: new Date().getTime(),
    });
    this.setState({ books }, () => {
      console.log(this.state.books);
      console.log(this.booksRefs);
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div>
        <h2>书籍列表：</h2>
        {/* 这里直接包裹li，我们需要告诉TransitionGroup用什么元素包裹，component属性 */}
        <TransitionGroup component="ul">
          {books.map((book, index) => {
            return (
              // 动画依旧是在CSSTransition当中写的,每个li都对应一个CSSTransition
              // 需要使用key属性，1.方便react识别新旧元素，2.方便动画执行

              <CSSTransition
                key={book.id}
                nodeRef={this.getItemRef(book.id)}
                timeout={1000}
                classNames="book" // 书籍动画的类名
              >
                <li ref={this.getItemRef(book.id)}>
                  {book.name}
                  <button onClick={(e) => this.removeBook(index)}>删除</button>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <button onClick={(e) => this.addNewBook()}>添加新书籍</button>
      </div>
    );
  }
}

export default App;
