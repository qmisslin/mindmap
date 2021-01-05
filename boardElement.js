function BoardElement(position, id) {
    position = position || {x: 0, y: 0};
    this.position = {x: position.x || 0, y: position.y || 0}
    this.id = id || "board_element"
    this.size = {x: 50, y: 50}
    this.hover = false;
    this.select = false;
    this.border = 2;
}

BoardElement.prototype.isHover = function(position) {
    return (
        position.x >= this.position.x && 
        position.y >= this.position.y &&
        position.x <= this.position.x + this.size.x &&
        position.y <= this.position.y + this.size.y
    );
}

BoardElement.prototype.render = function(ctx, scale) {

    // Border
    ctx.fillStyle = this.select ? 
        "#ffa90f" : this.hover ? 
        "#ffffff" : 
        "#000000";
    ctx.fillRect(
        this.position.x - this.border / scale, 
        this.position.y - this.border / scale, 
        this.size.x + this.border * 2 / scale, 
        this.size.y + this.border * 2 / scale);


    // Content
    ctx.fillStyle = "#353535";
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
}