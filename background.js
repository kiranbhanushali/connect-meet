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
     let x =  chrome.tabs.create({url: chrome.extension.getURL('chats.html')});
    
}


// contains all the messages 
// structure 
//   message:{
//      name , 
//      timestamp
//      message


// contains all messages from diffrent meets
var messages = [] ; 



//listent the messages 
chrome.runtime.onMessage.addListener(
    ( req , sender , sendResponse ) =>{
        // add message to the messages list
        console.log( " message listened " ) ;
        console.log ( req) 
        console.log( req.type ) ;
        console.log( " message ends  " ) ;

        if( req.type ==="ADD"){
            req.tabid = sender.tab.id;
            messages.push ( req) ;
        }
        else if( req.type==="CLEAR"){
            let ok = 0 ; 
            while(  !ok ) {
                ok = 1 ;
                for( var i = 0; i < messages.length; i++){ 
                    if ( messages[i].tabid === sender.tab.id) { 
                        messages.splice(i, 1); 
                        ok = 0 ; 
                        break;
                    }
                }
            }
        }
        var port = chrome.runtime.connect({name: "Chat"});
        port.postMessage({messages, type:"CHAT"});
    }
);

// print all messages in new tab 
var print = ()=>{

   for ( var i in messages ){
       console.log( i ) ;
   }

}



