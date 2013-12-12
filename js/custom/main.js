(function($){

    var init = function(){
        delegate();
    }

    var delegate = function(){
        $(window).on("resize",fullScreen);
        fullScreen();
    }

    var fullScreen = function(){
        var height = $(window).height();
        $("#title_section").css({
            minHeight:height - 20,
            })
        if($(".faceRow").width() > 768 )
        {
            $(".faceImg").css({
                'line-height': height + 'px',
            })
        }
    }
    $(document).ready(init);
})(jQuery)


var svg = document.getElementById("arduino_anim");

svg.addEventListener('load', function() {
    console.log("load");
    /* Disable display of sub text */
    var sub_text = getsvg_content().getElementById("nik");
    //sub_text.style.visibility = "hidden";
    var sub_text = getsvg_content().getElementById("tech");
    sub_text.style.visibility = "hidden";
    setTimeout(load_timeout, 1000);
}, false);

function getsvg_content() {
    if (svg.contentDocument)
    {
        return svg.contentDocument;
    }
    else
    {
        try {
            return svg.getSVGDocument();
        } catch(e) {}
    }
}

function load_timeout() {
    console.log("timeout");
    var svgfile = getsvg_content();
    var usbconn = svgfile.getElementById("usbmain");
    usbconn.setAttribute('class', 'usb_plugin');
    /* Set timeout for start of blinking event */
    /* Add some small after connector plugs in */
    setTimeout(start_blink, 500 + 300);
}

function start_blink() {
    var led = getsvg_content().getElementById("led");
    led.setAttribute('class', 'blink');
    setTimeout(display_subtext, 500 + 300);
}

function display_subtext() {
    //var sub_text = getsvg_content().getElementById("masker");
    var sub_text = getsvg_content().getElementById("tech");
    sub_text.style.visibility = "";
    var paths = toArray(sub_text.querySelectorAll("path"));
    //var sub_text = getsvg_content().getElementById("Layer_8");
    //sub_text.style.visibility = "";
    //var paths_1 = toArray(sub_text.querySelectorAll("path"));
    //paths.push(paths_1);

    var begin = 0;
    var durations = paths.map(function(path) {
        var length = Math.ceil(path.getTotalLength());

        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = -length;

        return Math.pow(length, 0.5) * 0.01;
    });

    paths[0].getBoundingClientRect();

    paths.forEach(function(path, i) {
        path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset ' + durations[i] + 's ' + begin + 's ease-in-out';
        path.style.strokeDashoffset = '0';
        begin += durations[i] + 0.1;
    });

    console.log("array");
}

function toArray(arr) {
    return Array.prototype.slice.call(arr);
}


