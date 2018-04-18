$(".bid-on-it").click( function() {
    let artworkId = $(this).attr("artwork-id");
    // console.log("/lot/" + artworkId);
    window.location.href = "/lot/" + artworkId;
});