

const bookmarks = (function(){

    
    const generateBookmark = function(bookmark){
        if (bookmark.expanded == false){
        return `
        <li class="bookmark-view small" data-bookmark-id="${bookmark.id}">
            <div class="bookmark-box">
                <div>
                    <span>title:</span><span>${bookmark.title}</span>
                </div>
                <div>
                    <span>rating:</span><span>${bookmark.rating}/5</span>
                </div>
                    <button class="edit-button">edit</button>
                <button class="delete-button">delete</button>
            </div>
        </li>`
        }
        else {
            return `
            <li class="bookmark-view large" data-bookmark-id="${bookmark.id}">
            <div class="bookmark-box">
                <div>
                    <span>title:</span><span>${bookmark.title}</span>
                </div>

                <span>description:</span><div>${bookmark.desc}</div>
                <span>visit site: <a href="${bookmark.url}">${bookmark.url}</a></span>
                <div>
                    <span>rating:</span><span>${bookmark.rating}/5</span>
                </div>
                <button class="edit-button">edit</button>
                <button class="delete-button">delete</button>
            </div>
        </li>`
        };
    };

    const generateBookmarkString = function(bookmarkList){
        const items = bookmarkList.map(generateBookmark);
        return items.join('');
    }

    const render = function(){
        let items = store.items;
        if(store.filterValue){
            items = items.filter(item => item.rating >= store.filterValue)
        };
        const bookmarkString = generateBookmarkString(items);

        $('.bookmark-list').html(bookmarkString);
    };



    function getItemIdFromElement(item) {
        return $(item)
        .closest('.bookmark-view')
        .data('bookmark-id');
    }

    const handleBookmarkEdit = function(){
        $('.bookmark-list').on('click', 'button.edit-button', event=>{
            const id = getItemIdFromElement(event.currentTarget);
            const bookmark = store.findById(id);
            $(bookmark).copyToForm('.add-bookmark-form');
            store.editId = id;
        })
    }

    const clearValues = function(){
        $('.bookmark-title').val('');
        $('.bookmark-description').val('');
        $('.bookmark-url').val('');
        $('.bookmark-rating').val('1');
        $('.error-message').text('');
    }



    const handleAddSubmit = function(){
        $('.add-bookmark-form').submit(event => {
            if(store.editId ==''){
                event.preventDefault();
                const newItem = $(event.target).serializeJson();
                api.createBookmark(newItem, item =>{
                store.addBookmark(item);
                clearValues();
                render();
            },() => {
                $('.error-message').text('Title and URL are required')});
        }
            else {
                event.preventDefault();
                const newBookmark = $(event.target).serializeJson();
                const oldBookmark = store.findById(store.editId);
                const newBookmarkObject = JSON.parse(newBookmark);
                
                api.editBookmark(newBookmark, () =>{
                    
                    store.findAndUpdate(oldBookmark,newBookmarkObject);
                    clearValues();
                    render();
                }, ()=> {
                    $('.error-message').text('Title and URL are required')
                });
                };
        });
    };

    const handleDeleteBookmark = function(){
        $('.bookmark-list').on('click', 'button.delete-button', event =>{
            console.log('ran')
            const id = getItemIdFromElement(event.currentTarget);
            api.deleteBookmark(id, () =>{
                store.findAndDelete(id);
                render();
            });
        });
    };

    const handleRatingFilter = function(){
        $('.bookmark-rating-filter').change(function(){
            console.log('hello')
            const newFilterValue = $('.bookmark-rating-filter').val()
            store.filterValue = newFilterValue
            render();
        })
    }

    const handleBookmarkExpand = function(){
        $('.bookmark-list').on('click','.bookmark-box', event =>{
            const id = getItemIdFromElement(event.currentTarget);
            const bookmarkItem = store.findById(id);
            bookmarkItem.expanded = !bookmarkItem.expanded
            render();
        })
    }

    const handleClearForm = function(){
        $('add-bookmark-form').on('click','clear-button',() =>{
            clearValues();
        })
    }

    const eventListeners = function(){
        handleAddSubmit()
        handleBookmarkEdit();
        handleDeleteBookmark();
        handleRatingFilter();
        handleBookmarkExpand();
        handleClearForm();
    }
    
    return{


        eventListeners,
        render, 
    }
    

    
}());
