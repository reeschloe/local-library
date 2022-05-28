function getTotalBooksCount(books) {
  // return number of books in array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // return number of accounts in array
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // filter books to only those that are currently being borrowed (0 index of borrows includes returned: false)
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  // return number of books in filtered array
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  // generate list of genres and counts
  const genreCounts = books.reduce(generateGenreList, []);
  // sort from highest count to lowest
  genreCounts.sort((genreOne, genreTwo) => genreOne.count > genreTwo.count ? -1 : 1);
  // destructure and return first 5 entries 
  const [first, second, third, fourth, fifth, ...otherGenres] = genreCounts;
  const commonGenres = [first, second, third, fourth, fifth];
  return commonGenres;
}

function generateGenreList(genreCounts, book) {
  // check if already included
  let genreNamesAlreadyInList = genreCounts.map(genre => genre.name);
  let bookGenreAlreadyInList = genreNamesAlreadyInList.find(name => name === book.genre);
  if (bookGenreAlreadyInList) {
  // add 1 to count for genre if already included
    for (let i = 0; i < genreCounts.length; i++) {
      if (genreCounts[i].name === book.genre) {
        genreCounts[i].count += 1;
        break;
      }
    }
  } else {
    // add genre to list with count 1
    genreCounts.push({ name: book.genre, count: 1});
  }
  return genreCounts;
}

function getMostPopularBooks(books) {
  let booksTimesBorrowed = getCountOfTimesBooksBorrowed(books);
  // sort from highest count to lowest, descructure and return first five entries
  booksTimesBorrowed.sort((bookOne, bookTwo) => bookOne.count > bookTwo.count ? -1 : 1);
  const [first, second, third, fourth, fifth, ...otherBooks] = booksTimesBorrowed;
  const mostPopularBooks = [first, second, third, fourth, fifth];
  return mostPopularBooks;
}

function getCountOfTimesBooksBorrowed (books) {
  // create object for each book and count of times borrowed
  let booksTimesBorrowed = books.reduce((booksTimesBorrowed, book) => {
    const count = book.borrows.length;
    booksTimesBorrowed.push({name: book.title, count});
    return booksTimesBorrowed
  }, [])
  return booksTimesBorrowed;
}

function getMostPopularAuthors(books, authors) {
  // reuse count of books borrowed
  const booksTimesBorrowed = getCountOfTimesBooksBorrowed(books);
  // create object for each author and times their books have been borrowed
  let authorsTimesBorrowed = authors.reduce((authorsTimesBorrowed, author) => {
    // filter to books by author
    const booksByAuthor = booksTimesBorrowed.filter(book => {
      const currentBook = books.find(bookObject => book.name === bookObject.title);
      return currentBook.authorId === author.id;
    })
    // add up counts of borrows for all books by author
    let count = booksByAuthor.reduce((totalCount, bookByAuthor) => {return totalCount + bookByAuthor.count}, 0);
    authorsTimesBorrowed.push({name: `${author.name.first} ${author.name.last}`, count});
    return authorsTimesBorrowed;
  }, []);
  // sort from highest count to lowest, destructure and return first five
  authorsTimesBorrowed.sort((authorOne, authorTwo) => authorOne.count > authorTwo.count ? -1 : 1);
  const [first, second, third, fourth, fifth, ...otherAuthors] = authorsTimesBorrowed;
  const mostPopularAuthors = [first, second, third, fourth, fifth];
  return mostPopularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
