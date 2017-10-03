function showQR() {
    $("#QRcode").css("display", "block");
    $('#QRcode').closest('.swiper-slide').addClass('swiper-no-swiping');
}
$("#hideQR").click(function(e) {
    $("#QRcode").css("display", "none");
    $('#QRcode').closest('.swiper-slide').removeClass('swiper-no-swiping');
});
/* ==================================================
<| $(document).ready
================================================== */
//播放器控制
var audio = document.getElementById('mp3');
$('.music').click(function() {
    //防止冒泡
    event.stopPropagation();
    if (audio.paused) //如果当前是暂停状态
    {
        $('.music').css("animation", "rotate 2s infinite linear");
        audio.play(); //播放
        return;
    }

    //当前是播放状态
    $('.music').css("animation", "circle 2s infinite linear ");
    audio.pause(); //暂停
});
/* ==================================================
<| swiper
================================================== */
var swiper;
window.addEventListener('load', function() {
	var firstLoad = true;
	swiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		mousewheelControl: false,
		onSlideNextStart: function(swiper){
				if(swiper.activeIndex === 4){
					if(firstLoad) initSignature();
					firstLoad = false;
				} //切换结束时，告诉我现在是第几个slide
		}
	});
	var startScroll, touchStart, touchCurrent;
	var isx5 = isWechatOrQQ();
	var distanceFix = isx5 ? 1 : 0;// 修复微信qq下滑动位置判断bug
	swiper.slides.on('touchstart', function(e) {
		startScroll = this.scrollTop;
		touchStart = e.targetTouches[0].pageY;
	}, true);
	swiper.slides.on('touchmove', function(e) {
		touchCurrent = e.targetTouches[0].pageY;
		var touchesDiff = touchCurrent - touchStart;
		var slide = this;
		var onlyScrolling = 
				( slide.scrollHeight > slide.offsetHeight ) && //allow only when slide is scrollable
				(
					( touchesDiff < 0 && startScroll === 0 ) || //start from top edge to scroll bottom
					( touchesDiff > 0 && startScroll >= ( slide.scrollHeight - slide.offsetHeight - distanceFix ) ) || //start from bottom edge to scroll top
					( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight - distanceFix ) ) //start from the middle
				);
		if (onlyScrolling) {
			e.stopPropagation();
		}
	}, true);
	// 横屏监听
	var updateOrientation = function() {
	if(window.orientation=='-90' || window.orientation=='90'){
		console.log('为了更好的体验，请将手机/平板竖过来！');      
	};
	}
	window.onorientationchange = updateOrientation;
	function isWechatOrQQ(){
		var ua = navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i)=="micromessenger" || ua.match(/QQ/i) == "qq") { 
			return true;
		}	
		return false;
	}
});
/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
    initializePageProduct();
});
/* ==================================================
<| initializePageProduct
================================================== */
function initializePageProduct() {
    /* yearlist */
    var yearlist = $(".m-product").find(".yearlist");
    var menu = yearlist.find(".menu").find(".options");
    var list = ["2017", "2016", "2015", "2013", "2012", "2011", "2006", "2005", "2002"];
    initializeMenu(menu, list);
}
/* ==================================================
<| initializeMenu
================================================== */
function initializeMenu(menu, list) {
    /* options */
    list.forEach(function(value) {
        var option = $("<p></p>").text(value);
        menu.append(option);
    });
    /* set active */
    menu.attr("index", 0);
    var options = menu.find("p");
    var option = options.first(); //option = $(options[1]);
    option.addClass("active");
    /* set event */
    menu.attr("tabindex", 0);
    menu.focus();
    menu.bind("keydown", function(event) {
        scrollEffect(menu, event);
    });
    /* bind event */
    menu.bind("click", function(event) {
        console.log("clock");
    });
    menu.bind("mouseover", function() {
        menu.unbind("keydown");
        menu.bind("keydown", function(event) {
            scrollEffect(menu, event);
        });
    });
    menu.bind("mouseout", function() {
        menu.unbind("keydown");
    });
    var X, Y, startX, startY, lock = false;
    menu.bind("touchstart", function(event) {
        startX = event.originalEvent.changedTouches[0].pageX,
            startY = event.originalEvent.changedTouches[0].pageY;
    });
    menu.bind("touchmove", function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (lock) return;
        lock = true;
        var moveEndX = event.originalEvent.changedTouches[0].pageX,
            moveEndY = event.originalEvent.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;
        if (Y > 0) {
            scrollEffect(menu, event, 40);
        }
        if (Y < 0) {
            scrollEffect(menu, event, 38);
        }
    });
    menu.bind("touchend", function(event) {
        lock = false;
    });
}
/* ==================================================
<| scrollEffect
================================================== */
$(".yearpro").height($(".carousel").height());

function scrollEffect(menu, event, direction) {
    /* initialize */
    var key = direction || event.which;
    var rate = 70 + 4;
    var options = menu.find("p");
    var option = options.find(".active");
    var index = menu.attr("index");
    var now = index;
    var height = $(".yearpro").height();

    switch (key) {
        case 40:
            if (index >= 1) {
                now--;
                menu.animate({ marginTop: '+=' + 1.75 + 'rem' });
                $("#pro2017").animate({ marginTop: -6 * index + 6 + 'rem' });
            }
            break;
        case 38:
            if (index < 8) {
                now++;
                menu.animate({ marginTop: '-=' + 1.75 + 'rem' });
                $("#pro2017").animate({ marginTop: -6 * index - 6 + 'rem' });
            }
            break;
    }
    /* set animation */
    var css = {
        fontSize: '40px',
        color: '#A0A0A0'
    };
    var cssActive = {
        fontSize: '56px',
        color: '#00A0E9'
    }
    $(options[index]).animate(css);
    $(options[now]).animate(cssActive);
    /* set active index after the animation */
    setTimeout(function() {
        $(options[index]).removeClass("active");
        $(options[now]).addClass("active");
    }, 500);
    menu.attr("index", now);
}
// 设置QQ分享的标题图片等
setShareInfo({
    title: 'e曈网十五周年站庆',
    summary: '一路有你，相伴同行',
    pic: 'imgs/e.jpg',
    url: 'http://15th.eeyes.net',
    WXconfig: {
        swapTitleInWX: true,
        appId: '',
        timestamp: '',
        nonceStr: '',
        signature: ''
    }
});
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 * @link https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array/6274381#6274381
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

$(function () {
    $('#signBtn').click(function() {
        window.swiper.slideNext();
    });
    var danmakuWrapper = document.getElementById('danmaku_wrapper');
    var danmakuPainter = new DanmakuPainter(danmakuWrapper);
    var random = function (min, max) {
        return min + (max - min) * Math.random();
    };
    var resize = function () {
        danmakuWrapper.style.height = $('.swiper-slide')[0].clientHeight - danmakuWrapper.offseTop - 120 + 'px';
        danmakuPainter.resize.bind(danmakuPainter)();
    };
    resize();
    window.addEventListener('resize', resize);
    var isRequestAnimationFrame = false;
    var paint = function () {
        danmakuPainter.paint();
        requestAnimationFrame(paint);
    };
    var timerIds = [];
    window.initSignature = function () { // 在swiper滑动时监听
        resize();
        $.ajax({
            type: 'POST',
            url: 'api/index.php?name=download',
            success: function (data) {
                while (timerIds.length) {
                    clearTimeout(timerIds.pop())
                }
                var launch = function () {
                    shuffle(data);
                    var danmakuWrapperHeight = danmakuWrapper.clientHeight;
                    var t = 0;
                    for (var i = 0; i < data.length; ++i) {
                        var img = document.createElement('img');
                        img.src = data[i];
                        var imgHeight = danmakuWrapperHeight * random(.1, .3);
                        var imgWidth = imgHeight * 150 / 90;
                        img.style.height = imgHeight + 'px';
                        img.style.width = imgWidth + 'px';
                        img.style.opacity = random(.5, 1);

                        var div = document.createElement('div');
                        div.style.height = img.style.height;
                        div.style.width = imgWidth * random(1, 3) + 'px';
                        div.appendChild(img);

                        t += random(.1, .5);
                        danmakuPainter.launch(new Danmaku(div, 0, 5), t);
                    }
                    timerIds.push(setTimeout(launch, t * 1000));
                };
                launch();
                if (!isRequestAnimationFrame) {
                    isRequestAnimationFrame = true;
                    requestAnimationFrame(paint);
                }
            }
        });
    }
});

/* ==================================================
<| $(document).ready
================================================== */
$(document).ready(function() {
    setTimeout(function() {
        $(".onloading").fadeOut();
    }, 1000);
});
window.addEventListener('load', function() {
    initializePageTitle();
});
/* ==================================================
<| initializePageTitle
================================================== */
function initializePageTitle() {
    /* fingerprinting args */
    var timer = 0;
    var printing;
    var $intro = $(".intro");
    var $fingerprint = $(".fingerprint");
    var lock = false;
    /* if keep printing */
    $intro.on('touchstart', (function(event) {
        /* set timer */
        event.preventDefault();
        $intro.css({ visibility: 'hidden' });
        $fingerprint.css({ visibility: 'visible' });
        $fingerprint.addClass("bling");
        printing = setTimeout(function() {
            $fingerprint.removeClass("bling");
            $(".m-title").parent().removeClass("swiper-no-swiping");
            swiper.slideNext(false);
            $intro.hide();
            lock = true;
        }, 2000);
    }));
    $intro.on("touchend", function() {
        clearTimeout(printing);
        if (!lock) {
            $fingerprint.css({ visibility: 'hidden' });
            $fingerprint.removeClass("bling");
            $intro.css({ visibility: 'visible' });
        }
    });
}
var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas_width = $(window).width() - 2; // 考虑边框
var canvas_height = "250px";

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 9;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");
    var pic0 = document.getElementById('myCanvas');
    pic0.width = canvas_width;
    pic0.height = 250;
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas_width, 250);

    var $canvas = $('#myCanvas');
    $canvas[0].addEventListener('touchstart', function(e) {
        mousePressed = true;
        e = e.touches[0];
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    });
    $canvas[0].addEventListener('touchmove', function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (mousePressed) {
            e = e.touches[0];
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });
    $canvas[0].addEventListener('touchend', function() {
        mousePressed = false;
    });
    $canvas.mouseup(function(e) {
        mousePressed = false;
    });
    $canvas.mouseleave(function(e) {
        mousePressed = false;
    });
}

InitThis();


//清空画板
function clearBoard() {
    ctx.clearRect(0, 0, canvas_width, 250);
}

function UploadPic() {
    var Pic = document.getElementById("myCanvas").toDataURL("image/png", 0.5);
    $.ajax({
        type: 'POST',
        url: './api/index.php?name=upload',
        data: { 'data': Pic },
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function(data) {
            if (data == -1) {
                alert("上传成功！");
                initSignature();
                swiper.slidePrev(false);
            } else {
                alert("上传失败！请重试！");
            }
        }
    })
}
window.addEventListener('load', function() {
    var canvas;
    var ctx;
    var sentences = [
        '溽暑步月，往昔满心头，十五载相庆相救',
        '路不曾平，志不曾移',
        '少年郎，犹记旧时新月梦'
    ];
    var wordWidth = 36;
    var c_width = window.innerWidth;
    var wordWra = document.querySelector('.wordWra');
    var firstWra = document.querySelector('.first');
    var secondWra = document.querySelector('.second');
    var thirdWra = document.querySelector('.third');
    var wordSlide = document.querySelector('#word');
    var imgs = document.querySelectorAll('.imgWra img');
    var progress = 0;
    var fullProgress = 25;
    var stage = 1;
    var drawLock = false;
    
    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = c_width * 2;
        ctx.font = '36px KaiTi,STKaiti';
        var timer;
        var lock = false;
        var $tipIcon = $('.icon-finger');
        wordWra.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (lock) return;
            lock = true;
            $tipIcon.hide();
            timer = setInterval(function() {
                if (progress >= fullProgress) {
                    clearInterval(timer);
                    drawText(function() {
                        progress = 0;
                        $tipIcon.removeClass('stage'+stage);
                        stage++;
                        $tipIcon.addClass('stage'+stage);
                        if (stage <= 3) {
                            lock = false;
                            drawLock = false;
                            setTimeout(function() {
                                $tipIcon.show();
                            }, 500);
                        }
                        else {
                            $('#word').removeClass('swiper-no-swiping');
                            $tipIcon.hide();
                        }
                    });
                } else {
                    progress += 2;
                    fill(stage);
                }
            }, 100);
        });
        wordWra.addEventListener('touchend', function() {
            if (timer) {
                clearInterval(timer);
                lock = false;
            }
        });
    }

    function fill(stage) {
        if (stage === 1) {
            firstWra.style.height = progress / fullProgress * 154 + 'px';
        }
        if (stage === 2) {
            secondWra.style.height = progress / fullProgress * 182 + 'px';
        }
        if (stage === 3) {
            thirdWra.style.width = progress / fullProgress * 194 + 'px';
        }
    }

    function drawText(callback) {
        if(drawLock) return;
        drawLock = true;// 避免绘制过程再次出发touch事件
        var i = 0, j=1;
        var fadeStep = 8;// 文字淡入step数，用于Tween
        var startPosition = (c_width * 2 - wordWidth * sentences[stage - 1].length) / 2;// 根据文字长度计算渲染起始位置
        if (stage > 1) imgs[stage - 2].style.opacity = 0;
        imgs[stage - 1].style.opacity = 1;
        ctx.clearRect(0, 0, c_width * 2, 80);// 渲染下一幕文字时清空画布
        var clock = setInterval(function() {
            if (!sentences[stage - 1][i] && j===fadeStep) {// 当前文字渲染结束调用回调
                clearInterval(clock);
                callback();
            } else {
                j>fadeStep?j=1:j;
                ctx.fillStyle = 'rgba(0,0,0,' + Tween.Quad.easeIn(j, 0.2, 1, fadeStep) + ')';// 透明度计算，用于渐进渲染
                if(j++===1) {// 开始渲染某个文字
                    ctx.fillText(sentences[stage - 1][i], startPosition+wordWidth*i, wordWidth);
                    i++;
                }else{// 渐进渲染当前文字
                    ctx.clearRect(startPosition+wordWidth*(i-1), 0, wordWidth, 40);
                    ctx.fillText(sentences[stage - 1][i-1], startPosition+wordWidth*(i-1), wordWidth);
                }
            }
        }, 16);
    }
    init();
});