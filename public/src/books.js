function findAuthorById(authors, id) {
  let person = authors.find((author) => author.id === id);
  return person;
}

function findBookById(books, id) {
  let bookFound = books.find((book) => book.id === id);
  return bookFound;
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];
  const bookList = [borrowedBooks, returnedBooks];
  books.forEach((book) => {
    book.borrows.find((borrow) => borrow.returned === false)
      ? borrowedBooks.push(book)
      : returnedBooks.push(book);
  });
  return bookList;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const copy = borrows.map(({ id, returned }) => {
    const account = accounts.find((account) => account.id === id);
    return {
      ...account,
      returned,
    };
  });
  return copy
    .sort((borrowA, borrowB) => {
      const companyA = borrowA.company;
      const companyB = borrowB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
