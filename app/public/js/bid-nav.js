var bidButtons = $(".bid-on-it");

bidButtons.forEach( e => {
    e.click( () => {
        console.log("You clicked my button");
        console.log($(this).attr("artwork-id"));
    });
});