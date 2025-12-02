export async function toggleFavorite(bookId, isFav) {
  if (!bookId) return;

  if (isFav) {
    // remove
    await fetch("/api/favorite", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    return false;
  } else {
    // add
    await fetch("/api/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId }),
    });
    return true;
  }
}
