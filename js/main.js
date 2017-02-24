var api_key = "oz4l1sclly2yr0luge90ao3v";
var shop_name = "nathanieldeal";

// Populate shop items
function populateSection(shopSectionID) {

    $.ajax({
        url: "https://openapi.etsy.com/v2/shops/" + shop_name + "/listings/active.js?api_key=" + api_key + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
        dataType: 'jsonp',
        success: function (resp) {

            // Render shop items
            for (i = 0; i < resp.results.length; i++) {
                if (resp.results[i].shop_section_id === shopSectionID) {
                    //show results
                    if (i % 4 == 0) {
                        $("#" + shopSectionID).append('<div class="clearfix hidden-xs-block"></div>');
                    } 
                    $("#" + shopSectionID).append('<div class="col-md-3 center-text" style="margin-bottom:20px"><a target="_blank" href="' 
                    + resp.results[i].url + '">' + '<img class="img-responsive img-thumbnail" alt="' 
                    + resp.results[i].title + '" src="' + resp.results[i].MainImage.url_570xN
                    + '" style="margin-bottom:20px"></img></a><div style="font-size: 16px; font-weight: 300">' + resp.results[i].title
                    + ' | <a href="' + resp.results[i].url + '">$' + resp.results[i].price + ' USD</a></div></div>');
                }
            }
        },
    });

}

// Create shop sections then populate each
function createSections() {
    $.ajax({
        url: "https://openapi.etsy.com/v2/shops/" + shop_name + "/sections.js?api_key=" + api_key,
        dataType: 'jsonp',
        success: function (resp2) {
            for (i = 0; i < resp2.results.length; i++) {
                $('#shop').append("<div id=" + resp2.results[i].shop_section_id + "></div>");
                populateSection(resp2.results[i].shop_section_id);
            }
        }
    });
}

$(document).ready(function () {
    // Create shop sections
    createSections();

    // Create youtube sections
    $(".youmax").youmax({
        channelLink:"https://www.youtube.com/user/nathanieldeal",
        playlistLink:"https://www.youtube.com/playlist?list=PLf-5q-rl4XaYPBL4mRcIOaUdeYhRe-vt3",
        apiKey:"AIzaSyDKgaToDFqFc2WMQDBIrH_cbaX3xZKSl8w",
        maxResults:"9",
        videoDisplayMode:"popup",
        defaultTab:"Uploads",
        hideHeader:false,
        hideTabs:false,
        hideLoadingMechanism:false,
    });
});