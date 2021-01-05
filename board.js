function Board(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.zoomFactor = 0.2;
    this.size = this.setSize();
    this.scale = 1;
    this.origin = { x: 0, y: 0 };
    this.viewSize = { 
        x: this.size.x / this.scale, 
        y: this.size.y / this.scale
    };
    this.elements = [];
    this.render();
}
Board.prototype.setSize = function () {
    this.size = {
        x: this.canvas.offsetWidth,
        y: this.canvas.offsetHeight
    };
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
    return this.size;
}
Board.prototype.render = function () { 
    this.ctx.clearRect(
        this.origin.x, this.origin.y,
        this.viewSize.x, this.viewSize.y
    );
    this.elements.forEach(element => element.render(this.ctx, this.scale));
}
Board.prototype.zoomOn = function(position, zoomDelta) {
    let zoom = Math.exp(zoomDelta * this.zoomFactor);
    this.ctx.translate(this.origin.x, this.origin.y);
    this.origin.x -= position.x / (this.scale * zoom) - position.x / this.scale;
    this.origin.y -= position.y / (this.scale * zoom) - position.y / this.scale;
    this.ctx.scale(zoom, zoom);
    this.ctx.translate(-this.origin.x, -this.origin.y);
    this.scale *= zoom;
    this.viewSize.x = this.size.x / this.scale;
    this.viewSize.y = this.size.y / this.scale;
}
Board.prototype.getViewPosition = function(position) {
    return {
        x: this.origin.x + position.x/this.scale,
        y: this.origin.y + position.y/this.scale
    };
}
Board.prototype.addElement = function(position) {
    position = this.getViewPosition(position);
    let id = "el" + this.elements.length;
    this.elements.push(new BoardElement(position, id));
}
Board.prototype.selectElement = function(position, multiple) {
    position = this.getViewPosition(position);
    this.elements.forEach(element => {
        if(multiple) {
            element.select = element.select || element.hover;
        } else {
            element.select = element.hover;
        }
    })
}
Board.prototype.setHoverElement = function(position) {
    position = this.getViewPosition(position);
    let hover = false;
    for(var i = this.elements.length - 1; i >= 0; i--) {
        let element = this.elements[i];
        if(!hover) {
            hover = element.isHover(position);
            element.hover = hover;
        } else {
            element.hover = false;
        }
    };
    
    this.render();
}