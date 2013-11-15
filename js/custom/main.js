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
