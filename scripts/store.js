const store = (function(){


    const addBookmark = function(item){
        item.expanded = false;
        this.items.push(item);
        
    }


    const findAndUpdate = function(oldData, newData) {
        Object.assign(oldData, newData);
    };

    const findAndDelete = function(id) {
        
        this.items = this.items.filter(item => item.id !== id);
    };

    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };

return{
    items: [],
    editId: '',
    filterValue: '',

    addBookmark,
    findAndUpdate,
    findAndDelete,
    findById,

}


}())