import React, { useState } from "react";
import "./App.css";
import {
  Switch,
  Route,
  NavLink,
  Prompt,
  useRouteMatch,
  useParams,
  Link,
} from "react-router-dom";

function App({ bookFacade }) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={bookFacade} />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={bookFacade} />
        </Route>


        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/add-book">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/find-book">
          Find Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2> Product </h2>
      <ul>
        {bookFacade.getBooks().map((book) => {
          return (
            <li key={book.id}>
              {book.title} &nbsp;
              <Link to={`${url}/${book.id}`}>details</Link>
            </li>
          );
        })}
      </ul>
      <Switch>
        <Route exact path={path}>
          <p>Select a book to see details</p>
        </Route>
        <Route path={`${path}/:id`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function Details({ bookFacade }) {
  let { id } = useParams();
  const book = bookFacade.findBook(id);
  return (
    <div>
      <h2> Details</h2>
      <p>Title : {book.title}</p>
      <p>ID : {book.id}</p>
      <p>Info : {book.info}</p>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2> Company</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>NoMatch</h2>
    </div>
  );
}

function FindBook ({bookFacade}) {
  const emptyBook = { title: "", info: "", id: "" };
  const [id, setId] = useState("");
  const [book, setBook] = useState(emptyBook);

 
  const handleChange = e => {
    setId(e.target.value);
  };


  const handleSubmit = e => {
    if (id === "") return;
    setBook(bookFacade.FindBook(id)); 
    e.preventDefault(); 
    document.getElementById("find").value = ""; 
    }

    const findBookContent = () => {
      if (book.title === "") {
        return <p>Enter id for book to see details</p>;
      }
      return (
        <div>
          <p>ID : {book.id}</p>
          <p>Title : {book.title}</p>
          <p>Info : {book.info}</p>

        </div>
      );
    };


  return  (
    <div>
        <h2> Find Book</h2>

        <form> 
        <input
          type="text"
          id="find"
          placeholder="Find Book with id "
      
        />
        <br></br>
        <button onClick={handleSubmit}>Save</button>

        </form>

    </div> 
  )

  let bookContent = findBookContent();



}


function AddBook({ bookFacade }) {
  const [book, setBook] = useState({ title: "", info: "" });
  const [isBlocking, setIsBlocking] = useState(false);

  const handleSubmit = (e) => {
    if (book.title === "" || book.info === "") {
      return;
    }
    bookFacade.addBook(book);
    document.getElementById("title").value = "";
    document.getElementById("info").value = "";
    setIsBlocking(false);
    e.preventDefault();
  };

  const handleChange = (e) => {
    const val = e.target.value;
    const id = e.target.id;
    setBook({ ...book, [id]: val });
    setIsBlocking(e.target.value.length > 0);
  };

  return (
    <div>
      <h2> Add Book</h2>
      <form>
        <input
          type="text"
          id="title"
          placeholder="add title"
          onChange={handleChange}
        />
        <br></br>
        <input
          type="text"
          id="info"
          placeholder="Add Info"
          onChange={handleChange}
        />
        <br></br>
        <button onClick={handleSubmit}>Save</button>
      </form>
      <p>
        Title : {book.title} Info : {book.info}
      </p>
      <Prompt
        when={isBlocking}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
    </div>
  );
}

export default App;
