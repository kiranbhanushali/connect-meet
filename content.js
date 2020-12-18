console.log("content mutation script loaded")

function mySendMessage(cur_sender , message ) {

    chrome.runtime.sendMessage ( {cur_sender , message } ,
        (response)=>{
            console.log ( " response recieved " ) ;
        } 
    );

}
var dom_observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation=>{

        let node = mutation.addedNodes[0];
        if ( node ){
            node.querySelectorAll("div.Zmm6We").forEach( (doc)=> { console.log( doc.querySelectorAll('[data-message-text]')[0].innerText ) } );
        }   
    });
});

var container = document.documentElement || document.body;
var config = { 
    childList: true, subtree:true,
    attributeName: null,
    attributeNamespace: null,
    nextSibling: null,
    oldValue: null,
};
dom_observer.observe(container, config);


