console.log("content mutation script loaded")

function mySendMessage(myMessage, type  ) {

    chrome.runtime.sendMessage ( {myMessage,type } ,
        (response)=>{
            console.log ( " response recieved " ) ;
        } 
    );

}

function myf(mutation){
    let node = mutation.addedNodes[0];
    console.log( " calling myf here " ) ;
    // clear cur tabs messages from message
    mySendMessage( node , "CLEAR");
    
    var total = document.querySelectorAll("div.GDhqjd");
    console.log ( " toal " ) ;
    console.log ( total) ;
    if( total) 
        total.forEach( 
        (doc)=>
        {
            let childs = doc.getElementsByTagName("div") 
            let len = childs.length 
            let messageNode = {
                "name" : childs[1].innerHTML,
                "time" : childs[2].innerHTML,
                "tabid": 0,
                "childs" : [] 
            }
            // console.log (childs[1] ) ;
            // console.log( childs[2] ) ;
            for ( var i = 4 ; i < len ; i ++ ) {
                messageNode.childs.push( childs[i].innerHTML ) ;
            }
            if( messageNode.childs.length){
                console.log( " sending my message  to bg" ) 
                console.log ( messageNode ) ;
                mySendMessage( messageNode   , "ADD") ; 
            }
        }
    );
}





var dom_observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation=>{
        // filtering the mutation
        if (  mutation && (mutation.type == "childList") && (mutation.addedNodes.length == 1) && (mutation.removedNodes.length==0) && mutation.addedNodes[0].tagName=="DIV")
            myf(mutation);
    })
});

//observe whole DOM
var container = document.documentElement || document.body;
var config = { childList: true, subtree:true };

dom_observer.observe(container, config);
