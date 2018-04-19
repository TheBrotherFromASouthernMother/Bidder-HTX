$(".view-auction").click( function() {
    let auctionId = $(this).attr("auction-id");
    // console.log("/lot/" + artworkId);
    window.location.href = "/artwork/" + auctionId;
});