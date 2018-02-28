//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

// save Bookmark
function saveBookmark(e){
    console.log('It Works');

    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    
    var bookmark = {
        name: siteName,
        url: siteURL
    }

    // Local storage Test 
   /*  localStorage.setItem('test','Hello World')
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test') */

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') == null){

        //init array
        var bookmarks = [];
        //ass to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }  else {
        // get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // ASS BOOKMARK TO ARRAY
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } 

    // Prevents form from submitting
    e.preventDefault();
}

function fetchBookmarks() {
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    //get outpur id
    var bookmarksResults = document.getElementById('bookmarksResults');

   
    for(var i =0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML +='<div class= "well">'+
                                     '<h3>'+name+
                                     '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                     '<a class="btn btn-danger" target="_blank" href="'+#+'">Delete</a> '+
                                     '</h3>'+
                                     '</div>';
    }

}