function findAuthorById(authors, id) {
  // find author with matching id
  const matchingAuthor = authors.find(author => author.id === id);
  return matchingAuthor;
}

function findBookById(books, id) {
  // find book with matching id
  const matchingBook = books.find(book => book.id === id);
  return matchingBook;
}

function partitionBooksByBorrowedStatus(books) {
  // filter by 0 index of borrows having returned: false or true
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  const returnedBooks = books.filter(book => book.borrows[0].returned === true);
  const booksByBorrowedStatus = [borrowedBooks, returnedBooks];
  return booksByBorrowedStatus;
}

function getBorrowersForBook({borrows}, accounts) {
  let borrowerAccounts = borrows.reduce((borrowerAccounts, borrow) => {
    let borrowerId = borrow.id;
    // find account object for borrower
    const borrowerAccount = accounts.find(account => account.id === borrowerId);
    // add in returned element
    borrowerAccount.returned = borrow.returned;
    borrowerAccounts.push(borrowerAccount);
    return borrowerAccounts;
  }, [])

  //cleaner way to do this?
  // destructure and return ten accounts
  let [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth, ...rest] = borrowerAccounts;
  return [first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth];
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
