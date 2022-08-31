function findAccountById(accounts, id) {
  let person = accounts.find((park) => park.id === id);
  return person;
}

function sortAccountsByLastName(accounts) {
  const sort = accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() < nameB.name.last.toLowerCase() ? -1 : 1
  );
  return sort;
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let count = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === id) {
        count++;
      }
    });
  });
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const id = account.id;
  const borrowedBooks = [];
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let bookWithAuthor = [];
  borrowedBooks.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const newBook = {...book, author};
    bookWithAuthor.push(newBook);
  });
  return bookWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
