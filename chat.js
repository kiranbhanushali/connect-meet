console.log( " chat.js executes  " ) 


chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "Chat");
    port.onMessage.addListener(function(req) {
        if( req.type==="CHAT"){

            if( req.messages.length ) {
                //clear previous chats 
                //var s = document.getElementById("chats").innerHTML;
				document.getElementById("chats").innerHTML = "";
                //adding new chats 
				var s = "";
                for( let i =0;i<req.messages.length ; i++){
                    let p = req.messages[i];
                    //s = "<div class='title' >";
					if(p.myMessage.name!="You"){
						s = s.concat('<div class="incoming_msg"><div class="received_withd_msg"><span class="time_date"> ');
						s =  s.concat(p.myMessage.name);
						s = s.concat("</span><p>");
						s =  s.concat(p.myMessage.childs);
						s =  s.concat('</p><span class="time_date">');
						s =  s.concat(p.myMessage.time);
						s =  s.concat("</span></div></div>");
						
					}else{
						s = s.concat('<div class="outgoing_msg"><div class="sent_msg"><span class="time_date"> ');
						s =  s.concat(p.myMessage.name);
						s = s.concat("</span><p>");
						s =  s.concat(p.myMessage.childs);
						s =  s.concat('</p><span class="time_date">');
						s =  s.concat(p.myMessage.time);
						s =  s.concat("</span></div></div>");
					}
                }
                document.getElementById("chats").innerHTML = ( s ) ;
				document.getElementById('chats').scrollTop = 1000;
            }
        }
    });
});
			


