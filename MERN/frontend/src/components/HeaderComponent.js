import './HeaderComponent.css';
import $ from "jquery";
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function test() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}
$(document).ready(function () {
    setTimeout(function () { test(); });
});
$(window).on('resize', function () {
    setTimeout(function () { test(); }, 500);
});
$(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () { test(); });
});

const HeaderComponent = () => {
    return (
        <nav class="navbar navbar-expand-custom navbar-mainbg">
            <a class="navbar-brand navbar-logo" href="#">BIMTech</a>
            <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
                    <li class="nav-item active">
                        <a class="nav-link" href="javascript:void(0);" > Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Spacor</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Store</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Libraries</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Projects</a>
                    </li>
                </ul>
            </div>
            <div class="navbar-log" id="navbarSupportedContent">
                <ul class="navbar-log">
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Sign Up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="javascript:void(0);" > Log In</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default HeaderComponent