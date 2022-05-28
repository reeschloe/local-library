function findAccountById(accounts, id) {
  // find account with matching id
  const matchingAccount = accounts.find(account => account.id === id);
  return matchingAccount;
}

function sortAccountsByLastName(accounts) {
  // sort alphabetically by last name
  accounts.sort((accountOne, accountTwo) => accountOne.name.last > accountTwo.name.last ? 1 : -1);
  return accounts;
}

// find a way to incorporate the array methods in this one
function getTotalNumberOfBorrows({id}, books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      if (book.borrows[j].id === id) {
      count++;
    }
    } 
  }
  return count;
}

function getBooksPossessedByAccount({id}, books, authors) {
  // filter to only books not returned
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  // filter new list to books borrowed by given account
  const borrowedByAccount = borrowedBooks.filter(book => book.borrows[0].id === id);
  // add author info to book object
  const booksPossessedByAccount = borrowedByAccount.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return {...book, author}
  })
  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
