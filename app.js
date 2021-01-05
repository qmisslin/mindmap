function App() {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.board = new Board(this.canvas);

    // Set all event managers
    window.onresize = () => this.onResize();
    document.body.onkeypress = (e) => this.onKeyPress(e);
    this.canvas.onwheel = (e) => this.onWheel(e);
    this.canvas.onmousemove = (e) => this.onMouseMove(e);
    this.canvas.ondblclick = (e) => this.onDoubleClick(e);
    this.canvas.onclick = (e) => this.onClick(e);
}
App.prototype.getMousePosition = function(e) {
    return { x: e.offsetX, y: e.offsetY };
}
App.prototype.onResize = function() {
    this.board.setSize();
    this.board.render();
}
App.prototype.onWheel = function(e) {
    e.preventDefault();
    let position = this.getMousePosition(e);
    this.board.zoomOn(position, -Math.sign(e.deltaY));
    this.board.render();
}
App.prototype.onMouseMove = function(e) {
    this.board.setHoverElement(this.getMousePosition(e));
}
App.prototype.onDoubleClick = function(e) {
    this.board.addElement(this.getMousePosition(e));
    this.board.render();
}
App.prototype.onClick = function(e) {
    this.board.selectElement(this.getMousePosition(e), e.shiftKey || e.ctrlKey);
    this.board.render();
}
App.prototype.onKeyPress = function(e) {
    console.log(e);
}

new App();