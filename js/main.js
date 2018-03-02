//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

// save Bookmark
function saveBookmark(e){
    //console.log('It Works');

    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;
    
   if(!validateForm(siteName,siteURL)){
       return false
   }

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

        // Add BOOKMARK TO ARRAY
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        
    } 

    // clear form
    document.getElementById('myForm').reset();
    // re-fetch bookmarks
    fetchBookmarks();
    // Prevents form from submitting
    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url){
//get bookmarks from lovalstorage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// loop through bookmarks

    for(var i =0;i< bookmarks.length;i++) {
        if(bookmarks[i].url == url) {
            bookmarks.splice(i,1);
        }
    }
    //re-set back to localstorage / re-sets localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // re-fetch bookmarks
   fetchBookmarks();
 //  e.preventDefault();
}

function fetchBookmarks() {
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log(bookmarks);

    //get outpur id
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML ='';
    for(var i =0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML +='<div class= "well">'+
                                     '<h3>'+name+
                                     '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                     '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                     '</h3>'+
                                     '</div>';
    }

}


//validate Form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Pleace fill in the form')
        return false
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('please use a valid URL')
        return false;

    }

    return true
}