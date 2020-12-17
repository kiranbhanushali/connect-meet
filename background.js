chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({number: 1}, function() {
        console.log('Extention is installed');
    });
});


chrome.browserAction.onClicked.addListener( addTabToList );

// contains the tabs ids  when extention is clicked on perticular tab
let tabs_list = [];

function addTabToList(tab){
    tabs_list.push( tab.id) ;
    tabs_list = [ ...new Set(tabs_list) ];
}


// contains all the messages 
// structure 
//   message:{
//      name , 
//      timestamp
//      meetingcode,
//      message

var messages = [] ; 


chrome.runtime.onMessage.addListener(
    ( req , sender , sendResponse ) =>{
            // add message to the messages list 
        messages.push( req ) ; 
    }
);



// print all messages in new tab 

