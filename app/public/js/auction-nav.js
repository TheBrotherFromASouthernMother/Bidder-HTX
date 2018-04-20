$(".view-auction").click( function() {
    let auctionId = $(this).attr("auction-id");
    // console.log("/lot/" + artworkId);
    console.log(auctionId);
    window.location.href = "/artwork/" + auctionId;
});