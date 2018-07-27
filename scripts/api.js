const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/JohnC'

   $.fn.extend({
        serializeJson: function(){
            const formData = new FormData(this[0]);
            const newBookmark = {};
            formData.forEach((val,name) => newBookmark[name] = val);
            return JSON.stringify(newBookmark);
        }
        });

    $.fn.extend({
        copyToForm: function(form){
            const bookmarkItem = this[0];
            Object.keys(bookmarkItem).forEach(key =>{
                const value = bookmarkItem[key]
                const matchingInput= $(form).find(`[name='${key}']`);
                if(matchingInput.length > 0){
                    const firstMatchingInput = matchingInput.first();
                    firstMatchingInput.val(value);
                }
                
            } )
        }
    })     

    const createBookmark = function(bookmark, callback,errorCallback){

        $.ajax({
            url: `${BASE_URL}/bookmarks`,
            method: 'POST',
            contentType: 'application/json',
            data: bookmark,
            success: callback,
            error: errorCallback,
        })
    }

    const editBookmark = function(bookmark, callback, errorCallback){

        $.ajax({
            url:`${BASE_URL}/bookmarks/${store.editId}`,
            method: 'PATCH',
            contentType: 'application/json',
            data: bookmark,
            success: callback,
            error:errorCallback,
        })
    }

    const deleteBookmark = function(id, callback){

        $.ajax({
            url:`${BASE_URL}/bookmarks/${id}`,
            method: 'DELETE',
            contentType:'application/json',
            success:callback
        })
    }

    const pullBookmark = function(callback){
        $.getJSON(`${BASE_URL}/bookmarks`,callback)
    }

    return{
        createBookmark,
        pullBookmark,
        editBookmark,
        deleteBookmark,
    }
    }());


