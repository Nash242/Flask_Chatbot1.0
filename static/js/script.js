const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const refreshbtn = document.querySelector(".refresh-btn");
var clicked=false;
let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;



const generateResponse = (usermsg) => {
    if (usermsg.length > 0){
        let html_msg=`<li class="chat outgoing"><div class="u-question">${usermsg}</div>
                         <div style="color: grey;font-size:11px;padding-top: 10px;">${getCurrentDateTime()}</div>
                      </li>`;
        $(".chatbox").append(html_msg)
        let loader =`<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span>
                         <div class="bot-loader" style="border-radius:10px 10px 10px 10px;"></div>
                    </li>`
        $(".chatbox").append(loader)
        const API_URL = "/getanswer";
        const formData = new FormData();
        formData.append("question", usermsg);
        $.ajax({
            url: API_URL,
            type: "POST",
            data: formData,
            processData: false,  
            contentType: false  
        }).done(function(data) {
            console.log(data);
            $('.incoming:last').remove();
            var res='';
            if (!data.message.startsWith("answer:")) {
                res = data.message.trim();
            } else {
                res=data.message.trim()
            }
            $(".chatbox").append(`<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span>
                                        <div>
                                            <div class="bot-response"></div>
                                            <div class="like-btn-parent" style="display:none">
                                                <div style="display: flex;gap: 15px;" id="svg-parent">
                                                <svg onclick="like()" class="like-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFD43B" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>
                                                <svg onclick="dislike()" style="transform: rotateY(180deg);" class="like-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#FFD43B" d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>
                                                </div>
                                                <div id="res-alert" style="font-size: 12px;color: #ff555f;display:none;">
                                                    Response Saved...!
                                                </div>
                                            </div>
                                        </div>
                                    </li>`)
            res=convertUrlsToLinks(res)
            res=res.replace(/\n/g, "<br>")
            res=res.replace('<br><br>','<br>')
            
            typeWriter(res,typingSpeed = 40)
            
        }).fail(function() {
            // messageElement.classList.add("error");
            // messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).always(function() {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
    }else{
        alert('Please enter a question...')
    }
}

const handleChat = () => {
    $('.like-btn-parent').remove();
    userMessage = chatInput.value.trim(); 
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(userMessage);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

const refreshchat = () => {
    $(".chatbox").html('')  
    console.log('refresh click');
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    let htmlstring=`<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span>
                        <div class="bot-response ">
                            <div>Hello Buddy,Welcome to Access Robo.What brings you here today? 
                            Please use the options below or ask me anything about product.</div>
                            <br>
                            <br>
                            <h6>(Do not share any personally identificable information(pii) or sensitive personal information(spi) data as chat history is logged.)</h6>
                        </div>
                </li> 
                <li class="chat incoming" style="padding-top: 10px;">
                    <span class="material-symbols-outlined" style="color: transparent;background-color: transparent;">smart_toy</span>
                    <div class="bot-response">
                    <div>Here are some questions i can help you with.</div>
                    <button class="bot-btns" onclick="botbtns(this)">What is Azure Key Vault Encryption?</button>
                    <button class="bot-btns" onclick="botbtns(this)" style="margin: 5px 0px;">How many sessions, a user can open for the same request?</button>
                    <button class="bot-btns" onclick="botbtns(this)">How is End user login page experience of a Requester different from an Approver?</button>
                    
                    </div>
                </li>
                <li class="chat incoming" style="padding-top: 10px;">
                    <span class="material-symbols-outlined" style="color: transparent;background-color: transparent;">smart_toy</span>
                    <div style="color: grey;font-size: 11px;">Mon, May 13, 2024, 11:42:27 AM</div>
                </li>  `
  $(".chatbox").html(htmlstring)
}

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
refreshbtn.addEventListener("click", refreshchat);



function botbtns(ele){
    const buttonText = ele.innerText.trim();
    $('.like-btn-parent').remove();    
    generateResponse(buttonText);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    const buttons = document.querySelectorAll('.chatbox .bot-btns');
    buttons.forEach(button => { button.disabled = true });
    var helpBtns = document.getElementById('helpbtns');
    helpBtns.style.display = 'none';
}