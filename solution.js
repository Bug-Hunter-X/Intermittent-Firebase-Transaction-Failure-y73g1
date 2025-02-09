function incrementCounter(userId, retries = 3) {
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    return currentCounter + 1;
  }).then(function(result) {
    if (result.committed) {
      return result;
    } else {
      if (retries > 0) {
        console.log("Transaction failed, retrying...", result.error);
        return incrementCounter(userId, retries - 1);
      } else {
        console.error("Transaction failed after multiple retries", result.error);
        return Promise.reject(result.error);
      }
    }
  });
}