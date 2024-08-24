var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;


canvas.width = W;
canvas.height = H;

var fontSize = 16;
var columns = Math.floor(W / fontSize);
var drops = [];
for(var i=0; i<columns; i++){
drops.push(0);
}
var str = "JavaScript Hacking Effect";
function draw(){
context.fillStyle = "rgba(0,0,0,0.3)";
context.fillRect(0, 0, W, H);
context.fontSize = "700 " + fontSize + "px";
context.fillStyle = "#00cc33";
for(var i=0; i<columns; i++){
var index = Math.floor(Math.random()*str.length);
var x = i * fontSize;
var y = drops[i] * fontSize;
context.fillText(str[index], x, y);
if(y >= canvas.height && Math.random() > 0.99){
drops[i] = 0;
}
drops[i]++;
}
}
draw();
setInterval(draw, 70);


var tv = $('.tv');
function exit() {
    $('.tv').addClass('collapse');
    term.disable();
}

// ref: https://stackoverflow.com/q/67322922/387194
var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

var term = $('#terminal').terminal(function(command, term) {
    var cmd = $.terminal.parse_command(command);
    if (cmd.name === 'exit') {
        exit();
    } else if (cmd.name === 'echo') {
        term.echo(cmd.rest);
    } else if (command !== '') {
        try {
            var result = __EVAL(command);
            if (result && result instanceof $.fn.init) {
                term.echo('<#jQuery>');
            } else if (result && typeof result === 'object') {
                tree(result);
            } else if (result !== undefined) {
                term.echo(new String(result));
            }
        } catch(e) {
            term.error(new String(e));
        }
    }
}, 
);

