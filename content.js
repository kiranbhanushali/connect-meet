console.log("content mutation script loaded")

function mySendMessage(cur_sender , message ) {

    chrome.runtime.sendMessage ( {cur_sender , message } ,
        (response)=>{
            console.log ( " response recieved " ) ;
        } 
    );

}

let cur_sender = 'You';
let message = 'none';

var dom_observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation=>{
        if (mutation && (mutation.type == "childList") && (mutation.addedNodes.length == 1) && (mutation.removedNodes.length==0) && mutation.addedNodes[0].tagName=="DIV")
        {
            let node = mutation.addedNodes[0];
            console.log( node) ;
            //data-formatted-timestamp
           // data-sender-name="You"
            if(node)
            {            

                if(node.dataset.senderName){
                    console.log( " sender name   " ) ;
                    console.log( node.dataset.senderName); 
                    node = node.querySelector("[data-message-text]")
                    console.log( node.dataset.messageText); 

                    cur_sender = node.dataset.senderName;
                    message = node.dataset.messageText;
                }
                 if(node.dataset && node.dataset.messageText)
                {
                    message = node.dataset.messageText
                    console.log( node.dataset.senderName); 
                    console.log(message); 
                    message = node.dataset.messageText;
                    
                }
                mySendMessage( cur_sender , message ) ; 

            }
        }
    })
});

var container = document.documentElement || document.body;
var config = { childList: true, subtree:true };
dom_observer.observe(container, config);


