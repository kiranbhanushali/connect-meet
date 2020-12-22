console.log( " chat.js executes  " ) 


chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "Chat");
    port.onMessage.addListener(function(req) {
        if( req.type==="CHAT"){

            if( req.messages.length ) {
                //clear previous chats 
                document.body.innerHTML = "";
               
                //adding new chats 
                for( let i =0;i<req.messages.length ; i++){
                    let p = req.messages[i];
                    var s = "<h4 >"
                   s =  s.concat(p.myMessage.name);
                   s =  s.concat(p.myMessage.time);
                   s =  s.concat( "</h4><h6>");
                   s =  s.concat(p.myMessage.childs);
                   s =  s.concat("</h6>");
                    document.write( s ) ;
                }
            }
        }
    });
});



