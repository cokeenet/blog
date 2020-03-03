var cOpen=false,mOpen=false;
$(document).ready(function () {
    $(".loading").hide();
    gethitokoto();
});

$('.menu a').click(function () {
    target = $(this).attr('goto');
    switchTo(target);
});
function comm() {
    if(cOpen)return;
    var element1 = document.getElementById("comm");
    element1.src = "/comm.html";
    console.log("comm page loaded");
    cOpen=true;
}
function music() {
    if(mOpen)return;
    var element = document.getElementById("music");
    element.src = "/music.html";
    console.log("music page loaded");
    mOpen=true;
}
function switchTo(target) {
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function gethitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn/",
        dataType: "jsonp",
        async: true,
        jsonp: "callback",
        jsonpCallback: "echokoto",
        success: function (result) {
            write(result.hitokoto + " —— " + result.from);
        },
        error: function () {
            write("Error...");
        }
    });
}

function write(text) {
    if (text.length < 30) {
        $('#hitokoto').html(text);
    } else {
        gethitokoto();
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//异步加载背景

function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    }
    reader.readAsDataURL(blob);
}
var url = "/bg.jpg";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = "blob";
xhr.onload = function () {
    if (this.status == 200) {
        var blob = this.response;
        blobToDataURI(blob, function (t) {
            $("body").css("background-image", "url('" + t + "')");
            $("#background-small").addClass("smallBg");
            $("#background-small").css("opacity", "0");
        });
    }
}
xhr.send();