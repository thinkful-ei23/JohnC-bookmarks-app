


$(document).ready(function() {
    bookmarks.eventListeners();
    
    api.pullBookmark(items => {
        items.forEach(item => store.addBookmark(item));
        bookmarks.render();
    });
});
