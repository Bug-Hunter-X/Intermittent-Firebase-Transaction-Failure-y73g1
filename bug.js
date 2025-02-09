function incrementCounter(userId) {
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    return currentCounter + 1;
  });
}