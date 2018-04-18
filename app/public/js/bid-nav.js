var bidButtons = $(".bid-on-it");

bidButtons.forEach( element => {
    element.submit( (event) => {
        console.log("You clicked my button");
        console.log($(this).attr("artwork-id"));
        $.post("/lot", {
            artworkId: $(this).attr("artwork-id")
        });
    });
});