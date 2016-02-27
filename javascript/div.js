function IdAttribute(id ,opacity, width, height, tx, ty){
    var obj = document.getElementById(id);
    var translate = "translate(";
    obj.style.opacity = opacity;
    obj.style.width = width;
    obj.style.height = height;
    obj.style.webkitTransform = translate.concat(tx, ", ", ty, ")");
}
