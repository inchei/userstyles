// ==UserScript==
// @name         Maybe a Material Mediawiki
// @namespace    https://github.com/inchei/dotfiles
// @description  With 3m.css
// @author       inchei
// @include      *://*.moegirl.org/*
// @include      *://*.wikipedia.org/*
// @include      *://*.wikimedia.org/*
// @include      *://*.wikivoyage.org/*
// @include      *://*.wiktionary.org/*
// @include      *://*.wikibooks.org/*
// @include      *://*.wikidata.org/*
// @include      *://*.wikinews.org/*
// @include      *://*.wikiquote.org/*
// @include      *://*.wikisource.org/*
// @include      *://*.wikispecies.org/*
// @include      *://*.wikiversity.org/*
// @include      *://wiki.archlinux.org/*
// @include      *://wiki.komica.org/*
// @include      *://*.mediawiki.org/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// ==/UserScript==
$(function (){
    // 標題欄
    var str = window.location.href;

    if (str.indexOf("?title=") > -1)
        str = str.substring(str.indexOf("?title=") + 7);
    else
        str = str.substring(str.indexOf(".org/") + 5);
    $("#footer-info-lastmod").wrap('<a href="/index.php?title='+str+'&action=history"></a>');
    $("#firstHeading").append('<span class="mw-editsection" style="display: none;">[<a href="/index.php?title='+str+'&action=edit">编辑</a>]</span>');

    var topTitle = document.getElementById("firstHeading");
    topTitle = topTitle.innerText;
    $("div#p-personal").prepend('<span class="topTitle" title="' + topTitle + '">' + topTitle + '</span>');
    $(".topTitle").before('<a href="/" style="position: absolute; left: 15%;"><img width="30px" src="https://i.loli.net/2018/07/06/5b3f4f51de07f.png" alt=""/></a>');

    window.onscroll = function() {
        var len = window.scrollY;
        if (len < 1) {
            $("#p-personal").css("box-shadow", "none");
        }
        else {
            $("#p-personal").css("box-shadow", "0 2px 6px rgba(0, 0, 0,  .2)");
        }
    };

    // 使用鍵盤操作時，按 Tab 鍵顯示右上角鏈接
    $(document).keydown(function(event) {
　　　  if (event.keyCode == 9) {
　　　　  $('#p-personal ul').css('opacity', '1');
　　  　}
　　});

    // 以下僅適用於萌娘基金會旗下維基
    // 僅在有背景圖時主體卡片透明
    if ($('.sidebar-character').length > 0) {
        $('.ns-0 div#content, .ns-0 div#p-cactions li a:hover, .ns-0 div#p-cactions li.selected a, .ns-0 div#content div.thumb, div#content, div#p-cactions li a:hover, div#p-cactions li.selected a, div#content div.thumb').css('background', 'rgba(255, 255, 255, .8)');
        $('#mw-head-base').css('box-shadow', '0 140px 0 300px rgba(93, 130, 138, .5)');
        $('#mw-head-base').css('background', 'rgba(93, 130, 138, .5)');
    }

    // 提升大萌字分辨率，去背景
    $("#mw-content-text img").each(function() {
        if (this.src == "https://img.moegirl.org/common/thumb/d/d1/%E5%A4%A7%E8%90%8C%E5%AD%97.png/50px-%E5%A4%A7%E8%90%8C%E5%AD%97.png") {
            this.src = "https://i.loli.net/2017/08/02/5981bf14372d1.png";
            this.srcset = "";
        }
    });

});