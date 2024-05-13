var i = 0;
var speed = 50;



function like() {
    var lastOutgoingText = $('.u-question:last').text().trim();
    var lastBotResponseText = $('.bot-response:last').text().trim();
    var formData = new FormData();
    formData.append('usermassage', lastOutgoingText);
    formData.append('botresponse', lastBotResponseText);
    formData.append('datetime', realtime_datetime());
    $.ajax({
        url: '/likeresponse',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#res-alert').fadeIn().delay(3000).fadeOut();
            $('.like-btn-parent').css({
                'opacity': '0.6',
                'pointer-events': 'none'
            });
            let htmlstring = `<li class="chat incoming" style="padding-top: 10px;">
                                <span class="material-symbols-outlined" style="color: transparent;background-color: transparent;">smart_toy</span>
                                <div class="bot-response">
                                <div>"Thank you for your feedback !" Your response has been saved.<br>
                                Let me know if you have any questions...</div>
                                </div>
                            </li>`
            $(".chatbox").append(htmlstring)
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}
function dislike() {
    var lastOutgoingText = $('.u-question:last').text().trim();
    var lastBotResponseText = $('.bot-response:last').text().trim();
    var formData = new FormData();
    formData.append('usermassage', lastOutgoingText);
    formData.append('botresponse', lastBotResponseText);
    formData.append('datetime', realtime_datetime());
    $.ajax({
        url: '/dislikeresponse',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#res-alert').fadeIn().delay(3000).fadeOut();
            $('.like-btn-parent').css({
                'opacity': '0.6',
                'pointer-events': 'none'
            });
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
    let htmlstring = `<li class="chat incoming" style="padding-top: 10px;">
                            <span class="material-symbols-outlined" style="color: transparent;background-color: transparent;">smart_toy</span>
                            <div class="bot-response">
                            <div>"Thank you for your feedback !" Your response has been saved.<br>
                            if you have any queries you can contanct to your superiors.feel free to ask any queries ..!</div>
                            </div>
                        </li>`
    $(".chatbox").append(htmlstring)
}

function realtime_datetime() {
    var currentDatetime = new Date();
    var formattedDatetime = currentDatetime.toISOString();
    return formattedDatetime

}


function typeWriter(text, typingSpeed = 40) {
    console.log(text);
    let ele = document.getElementsByClassName("bot-response")
    let previoustext = ele[ele.length - 1].innerHTML
    let displayedText = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            displayedText = previoustext + text.substring(0, i + 1);
            ele[ele.length - 1].innerHTML = displayedText;
            i++;
            if (i == text.length) {
                let htmlstring = `<div style="color: grey;font-size: 11px;padding-top: 10px;">${getCurrentDateTime()}</div>`
                $('.like-btn-parent').before(htmlstring).last().css('display', 'block');
            }
            setTimeout(type, typingSpeed);
        }
    }
    type();
}

function getCurrentDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short', // Short weekday name (e.g., "Fri")
        month: 'short',   // Short month name (e.g., "May")
        day: 'numeric',   // Numeric day of the month (e.g., "10")
        year: 'numeric',  // Full numeric year (e.g., "2024")
        hour: 'numeric',  // Numeric hour (e.g., "5")
        minute: '2-digit', // Two-digit minute (e.g., "44")
        second: '2-digit', // Two-digit second (e.g., "17")
        hour12: true      // Use 12-hour clock with AM/PM
    };

    const dateTimeString = now.toLocaleString('en-US', options);
    return dateTimeString;
}


function convertUrlsToLinks(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        url.replace(/^[\W_]+|[\W_]+$/g,'');
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

function showhide() {
    var helpBtns = document.getElementById('helpbtns');
    if (helpBtns.style.display === 'block') {
        helpBtns.style.display = 'none';
    } else {
        helpBtns.style.display = 'block';
    }
}
