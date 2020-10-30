

$(".send-data").click(function(){
    var formData = $("#form").serialize()
    var wifi = formData.split("&")[0].split("=")[1]
    var pass = formData.split("&")[1].split("=")[1]
    socket.emit("socketChannel", {
        topic: "door/open",
        message: JSON.stringify({
            action: "save",
            network: wifi,
            pass: pass
        })
    })
}) 

$(".open-door").click(function(){
    socket.emit("socketChannel", {
        topic: "door/open",
        message: JSON.stringify({
            action: "open",
        })
    })
}) 