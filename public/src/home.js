function getTotalBooksCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (book) {
      count++;
    }
  });
  return count;
}

function getTotalAccountsCount(accounts) {
  let count = 0;
  accounts.forEach((account) => {
    if (account) {
      count++;
    }
  });
  return count;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) {
      count++;
    }
  });
  return count;
}

function getMostCommonGenres(books) {
  let genres = books.reduce((obj, book) => {
    let genre = book.genre;
    if (obj[genre]) {
      obj[genre].count++;
    } else {
      obj[genre] = { name: genre, count: 1 };
    }
    return obj;
  }, {});
  return Object.values(genres).sort(sortByPopularity).slice(0, 5);
}

function getMostPopularBooks(books) {
  let borrowCount = books.reduce((obj, book) => {
    let title = book.title;
    let borrow = book.borrows;
    if (obj[title]) {
      obj[borrow].count++;
    } else {
      obj[title] = { name: title, count: borrow.length };
    }
    return obj;
  }, {});
  return Object.values(borrowCount).sort(sortByPopularity).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let authorCount = authors.reduce((obj, book) => {
    var {
      name: { first, last },
      id,
    } = book;
    obj[id] = { name: `${first} ${last}`, count: 0 };
    books.forEach((book) => {
      if (book.authorId === id) obj[id].count += book.borrows.length;
    });
    return obj;
  }, {});
  return Object.values(authorCount).sort(sortByPopularity).slice(0, 5);
}

function sortByPopularity(elem1, elem2) {
  return elem2.count - elem1.count;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
