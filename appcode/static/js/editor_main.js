/**
 * Created by aub3 on 9/21/14.
 */
var image_input;
var debug = {};
var canvas = new fabric.Canvas('canvas');
var output_canvas = document.getElementById('canvas1');
var editor_row = $('#editor-row');
var editor = new JSONEditor(document.getElementById('jsoneditor'));
var code_console = $('#execute-code');
var js_console = document.getElementById('execute-code');
var jsfeat_gui_canny = new dat.GUI({ autoPlace: false }), jsfeat_gui_yape = new dat.GUI({ autoPlace: false }),
    jsfeat_gui_slic = new dat.GUI({ autoPlace: false }), jsfeat_gui_pf = new dat.GUI({ autoPlace: false });
var gui_canny =  $('#dat_gui_canny'), gui_yape = $('#dat_gui_yape'), gui_slic = $("#dat_gui_slic"), gui_pf = $("#dat_gui_pf");




initial = function() {
    if (document.location.hash !== '#zoom') return;

    function renderVieportBorders() {
      var ctx = canvas.getContext();

      ctx.save();

      ctx.fillStyle = 'rgba(0,0,0,0.1)';

      ctx.fillRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());

      ctx.setLineDash([5, 5]);

      ctx.strokeRect(
        canvas.viewportTransform[4],
        canvas.viewportTransform[5],
        canvas.getWidth() * canvas.getZoom(),
        canvas.getHeight() * canvas.getZoom());

      // var viewport = canvas.getViewportCenter();
      //console.log(canvas.getZoom(), viewport.x, viewport.y);

      ctx.restore();
    }

    $(canvas.getElement().parentNode).on('wheel mousewheel', function(e) {

      // canvas.setZoom(canvas.getZoom() + e.originalEvent.wheelDelta / 300);

      var newZoom = canvas.getZoom() + e.originalEvent.wheelDelta / 300;
      canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

      renderVieportBorders();

      return false;
    });

    var viewportLeft = 0,
        viewportTop = 0,
        mouseLeft,
        mouseTop,
        _drawSelection = canvas._drawSelection,
        isDown = false;

    canvas.on('mouse:down', function(options) {
      isDown = true;

      viewportLeft = canvas.viewportTransform[4];
      viewportTop = canvas.viewportTransform[5];

      mouseLeft = options.e.x;
      mouseTop = options.e.y;

      if (options.e.altKey) {
        _drawSelection = canvas._drawSelection;
        canvas._drawSelection = function(){ };
      }

      renderVieportBorders();
    });

    canvas.on('mouse:move', function(options) {
      if (options.e.altKey && isDown) {
        var currentMouseLeft = options.e.x;
        var currentMouseTop = options.e.y;

        var deltaLeft = currentMouseLeft - mouseLeft,
            deltaTop = currentMouseTop - mouseTop;

        canvas.viewportTransform[4] = viewportLeft + deltaLeft;
        canvas.viewportTransform[5] = viewportTop + deltaTop;

        console.log(deltaLeft, deltaTop);

        canvas.renderAll();
        renderVieportBorders();
      }
    });

    canvas.on('mouse:up', function() {
      canvas._drawSelection = _drawSelection;
      isDown = false;
    });
  };
initial();

(function() {
  fabric.util.addListener(fabric.window, 'load', function() {
    var canvas = this.__canvas || this.canvas,
        canvases = this.__canvases || this.canvases;

    canvas && canvas.calcOffset && canvas.calcOffset();

    if (canvases && canvases.length) {
      for (var i = 0, len = canvases.length; i < len; i++) {
        canvases[i].calcOffset();
      }
    }
  });
})();

$(document).ready(function(){
    image_input = $('#imgfile');
    image_input.on("change",function(){
        file = image_input[0].files[0];
        fr = new FileReader();
        fr.onload = function () {
            img = new Image();
            img.onload = function () {
                fabric.Image.fromURL(img.src, function (oImg) {
                oImg.scale(0.3);
                canvas.add(oImg);
                });
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(file);
    });
    gui_canny.append(jsfeat_gui_canny.domElement);
    gui_yape.append(jsfeat_gui_yape.domElement);
    gui_slic.append(jsfeat_gui_slic.domElement);
    gui_pf.append(jsfeat_gui_pf.domElement);
    gui_canny.hide();
    gui_yape.hide();
    gui_slic.hide();
    gui_pf.hide();
    code_console.hide();
    editor_row.hide();
    var load_options = {crossOrigin:"Anonymous"};

    fabric.Image.fromURL("/static/img/test.jpg", function(oImg)
    {
            oImg.scale(0.5);
            canvas.add(oImg);
    },load_options);

});


