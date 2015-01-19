function getActiveStyle(styleName, object) {
  object = object || canvas.getActiveObject();
  if (!object) return '';

  return (object.getSelectionStyles && object.isEditing)
    ? (object.getSelectionStyles()[styleName] || '')
    : (object[styleName] || '');
}

function setActiveStyle(styleName, value, object) {
  object = object || canvas.getActiveObject();
  if (!object) return;

  if (object.setSelectionStyles && object.isEditing) {
    var style = { };
    style[styleName] = value;
    object.setSelectionStyles(style);
    object.setCoords();
  }
  else {
    object[styleName] = value;
  }

  object.setCoords();
  canvas.renderAll();
}

function getActiveProp(name) {
  var object = canvas.getActiveObject();
  if (!object) return '';
  return object[name] || '';
}

function setActiveProp(name, value) {
  var object = canvas.getActiveObject();
  if (!object) return;
  object.set(name, value).setCoords();
  canvas.renderAll();
}

function addAccessors($scope) {

  $scope.getOpacity = function() {
    return getActiveStyle('opacity') * 100;
  };
  $scope.setOpacity = function(value) {
    setActiveStyle('opacity', parseInt(value, 10) / 100);
  };

  $scope.confirmClear = function() {
    if (confirm('Are you sure?')) {
      canvas.clear();
    }
  };

  $scope.getFill = function() {
    return getActiveStyle('fill');
  };
  $scope.setFill = function(value) {
    setActiveStyle('fill', value);
  };

  $scope.isBold = function() {
    return getActiveStyle('fontWeight') === 'bold';
  };
  $scope.toggleBold = function() {
    setActiveStyle('fontWeight',
      getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
  };
  $scope.isItalic = function() {
    return getActiveStyle('fontStyle') === 'italic';
  };
  $scope.toggleItalic = function() {
    setActiveStyle('fontStyle',
      getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
  };

  $scope.isUnderline = function() {
    return getActiveStyle('textDecoration').indexOf('underline') > -1;
  };
  $scope.toggleUnderline = function() {
    var value = $scope.isUnderline()
      ? getActiveStyle('textDecoration').replace('underline', '')
      : (getActiveStyle('textDecoration') + ' underline');

    setActiveStyle('textDecoration', value);
  };

  $scope.isLinethrough = function() {
    return getActiveStyle('textDecoration').indexOf('line-through') > -1;
  };
  $scope.toggleLinethrough = function() {
    var value = $scope.isLinethrough()
      ? getActiveStyle('textDecoration').replace('line-through', '')
      : (getActiveStyle('textDecoration') + ' line-through');

    setActiveStyle('textDecoration', value);
  };
  $scope.isOverline = function() {
    return getActiveStyle('textDecoration').indexOf('overline') > -1;
  };
  $scope.toggleOverline = function() {
    var value = $scope.isOverline()
      ? getActiveStyle('textDecoration').replace('overlin', '')
      : (getActiveStyle('textDecoration') + ' overline');

    setActiveStyle('textDecoration', value);
  };

  $scope.getText = function() {
    return getActiveProp('text');
  };
  $scope.setText = function(value) {
    setActiveProp('text', value);
  };

  $scope.getTextAlign = function() {
    return capitalize(getActiveProp('textAlign'));
  };
  $scope.setTextAlign = function(value) {
    setActiveProp('textAlign', value.toLowerCase());
  };

  $scope.getFontFamilygetStrokeColor = function() {
    return getActiveProp('fontFamily').toLowerCase();
  };
  $scope.setFontFamily = function(value) {
    setActiveProp('fontFamily', value.toLowerCase());
  };

  $scope.getBgColor = function() {
    return getActiveProp('backgroundColor');
  };
  $scope.setBgColor = function(value) {
    setActiveProp('backgroundColor', value);
  };

  $scope.getTextBgColor = function() {
    return getActiveProp('textBackgroundColor');
  };
  $scope.setTextBgColor = function(value) {
    setActiveProp('textBackgroundColor', value);
  };

  $scope.getStrokeColor = function() {
    return getActiveStyle('stroke');
  };
  $scope.setStrokeColor = function(value) {
    setActiveStyle('stroke', value);
  };

  $scope.getStrokeWidth = function() {
    return getActiveStyle('strokeWidth');
  };
  $scope.setStrokeWidth = function(value) {
    setActiveStyle('strokeWidth', parseInt(value, 10));
  };

  $scope.getFontSize = function() {
    return getActiveStyle('fontSize');
  };
  $scope.setFontSize = function(value) {
    setActiveStyle('fontSize', parseInt(value, 10));
  };

  $scope.getLineHeight = function() {
    return getActiveStyle('lineHeight');
  };
  $scope.setLineHeight = function(value) {
    setActiveStyle('lineHeight', parseFloat(value, 10));
  };

  $scope.getBold = function() {
    return getActiveStyle('fontWeight');
  };
  $scope.setBold = function(value) {
    setActiveStyle('fontWeight', value ? 'bold' : '');
  };

  $scope.toggleConsole = function(value) {
      if ($scope.js_console.style){
          $('#execute-code').toggle()
      }

  };

  $scope.getCanvasBgColor = function() {
    return canvas.backgroundColor;
  };
  $scope.setCanvasBgColor = function(value) {
    canvas.backgroundColor = value;
    canvas.renderAll();
  };

  $scope.addRect = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Rect({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.5
    }));
  };

  $scope.addCircle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Circle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      radius: 50,
      opacity: 0.8
    }));
  };

  $scope.addTriangle = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Triangle({
      left: coord.left,
      top: coord.top,
      fill: '#' + getRandomColor(),
      width: 50,
      height: 50,
      opacity: 0.8
    }));
  };

  $scope.addLine = function() {
    var coord = getRandomLeftTop();

    canvas.add(new fabric.Line([ 50, 100, 200, 200], {
      left: coord.left,
      top: coord.top,
      stroke: '#' + getRandomColor()
    }));
  };

  $scope.addPolygon = function() {
    var coord = getRandomLeftTop();

    this.canvas.add(new fabric.Polygon([
      {x: 185, y: 0},
      {x: 250, y: 100},
      {x: 385, y: 170},
      {x: 0, y: 245} ], {
        left: 50,
        top: 50,
        fill: '#001263'
      }));
  };

  $scope.addText = function() {
    var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
      'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

    var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
      left: getRandomInt(350, 400),
      top: getRandomInt(350, 400),
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#' + getRandomColor(),
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      originX: 'left',
      hasRotatingPoint: true,
      centerTransform: true
    });

    canvas.add(textSample);
  };


  $scope.save = function() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      $.post( "/Gallery", { "atoken":FB.getAccessToken(),"email":email, "s3key":s3key, "image": canvas.toDataURL('png'),'json':""}).done(
          function(data) {
              alert(data);
            });
        } // JSON.stringify(canvas.toDatalessJSON())
  };



  $scope.rasterize = function() {
    if (!fabric.Canvas.supports('toDataURL')) {
      alert('This browser doesn\'t provide means to serialize canvas to an image');
    }
    else {
      window.open(canvas.toDataURL('png'));
    }
  };

  $scope.getSelected = function() {
    return canvas.getActiveObject();
  };

  $scope.removeSelected = function() {
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();

    if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      canvas.discardActiveGroup();
      objectsInGroup.forEach(function(object) {
        canvas.remove(object);
      });
    }
    else if (activeObject) {
      canvas.remove(activeObject);
    }
  };


  $scope.sendBackwards = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendBackwards(activeObject);
    }
  };

  $scope.sendToBack = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendToBack(activeObject);
    }
  };

  $scope.bringForward = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringForward(activeObject);
    }
  };

  $scope.bringToFront = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringToFront(activeObject);
    }
  };




  $scope.execute = function() {
    if (!(/^\s+$/).test(consoleValue)) {
      eval(consoleValue);
    }
  };

  var consoleValue = (
    '// deselect currently selected objects\n' +
    'canvas.deactivateAll().renderAll();\n\n' +
    '// add red rectangle\n' +
    'canvas.add(new fabric.Rect({\n' +
    '  width: 50,\n' +
    '  height: 50,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(255,0,0)'\n" +
    '}));\n\n' +
    '// add green, half-transparent circle\n' +
    'canvas.add(new fabric.Circle({\n' +
    '  radius: 40,\n' +
    '  left: 50,\n' +
    '  top: 50,\n' +
    "  fill: 'rgb(0,255,0)',\n" +
    '  opacity: 0.5\n' +
    '}));\n'
  );

  $scope.getConsole = function() {
    return consoleValue;
  };

  $scope.setConsole = function(value) {
    consoleValue = value;
  };




  function initCustomization() {

    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      fabric.Object.prototype.cornerSize = 30;
    }
    fabric.Object.prototype.transparentCorners = false;
    if (document.location.search.indexOf('guidelines') > -1) {
      initCenteringGuidelines(canvas);
      initAligningGuidelines(canvas);
    }
  }

  initCustomization();



  $scope.getFreeDrawingMode = function() {
    return canvas.isDrawingMode;
  };




  $scope.setFreeDrawingMode = function(value) {
    canvas.isDrawingMode = !!value;
    $scope.$$phase || $scope.$digest();
  };

  $scope.freeDrawingMode = 'Pencil';

  $scope.getDrawingMode = function() {
    return $scope.freeDrawingMode;
  };
  $scope.setDrawingMode = function(type) {
    $scope.freeDrawingMode = type;
    $scope.$$phase || $scope.$digest();
  };

  $scope.getDrawingLineWidth = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.width;
    }
  };

  $scope.setDrawingLineWidth = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
    }
  };

  $scope.getDrawingLineColor = function() {
    if (canvas.freeDrawingBrush) {
      return canvas.freeDrawingBrush.color;
    }
  };
  $scope.setDrawingLineColor = function(value) {
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = value;
    }
  };


  $scope.jsoneditor_refresh = function(){
        editor.set(canvas.toDatalessJSON());
  };

  $scope.getJSON = function(){
        editor_row.toggle();
  };
  $scope.duplicate = function(){
    var obj = fabric.util.object.clone(canvas.getActiveObject());
        obj.set("top", obj.top+12);
        obj.set("left", obj.left+9);
        canvas.add(obj);
  };

  $scope.jsoneditor_download = function(){
    data = "data:application/octet-stream;charset=utf-8," + JSON.stringify(editor.get()); window.open(data);
  };

  $scope.jsoneditor_update = function(){

        canvas.clear();
        canvas.loadFromJSON(editor.get());
        canvas.renderAll()
  };

  $scope.getConsoleMode = function() {
        return code_console.is(':hidden');
  };
  $scope.getJSONMode = function() {
       return editor_row.is(':hidden')
  };


  $scope.load_image = function(){
    var input, file, fr, img;

    input = document.getElementById('imgfile');
      input.filel
    input.click();
  };

    $scope.updateCanvas = function () {
        var canvas_jsfeat = document.getElementById('canvas1');
        fabric.Image.fromURL(canvas_jsfeat.toDataURL('png'), function(oImg) {
            canvas.add(oImg);
        });
    };

//    $scope.inpaint = function(){
//	var canvas_jsfeat = document.getElementById('canvas1');
//    var ctx = canvas_jsfeat.getContext('2d');
//    var canvas_main_ctx = document.getElementById('canvas').getContext('2d');
//    canvas.deactivateAll().renderAll();
//    var blah  = canvas_main_ctx.getImageData(0, 0, canvas_jsfeat.height, canvas_jsfeat.width);
//	var width = blah.width, height = blah.height;
//	var mask_u8 = new Uint8Array(width * height);
//    var i;
//	for(i = 0; i < blah.data.length / 4; i++)
//    {
//		var Y = .299 * blah.data[4 * i] + .587 * blah.data[4 * i + 1] +  .114 * blah.data[4 * i + 2];
//		if(Y > 254){
//			var rad = 9;
//			for(var dx = -rad; dx <= rad; dx++){
//				for(var dy = -rad; dy <= rad; dy++){
//					if(dx * dx + dy * dy <= rad * rad){
//						mask_u8[i + dx + dy * width] = 1;
//					}
//				}
//			}
//			// blah.data[i * 4] = 0
//			// blah.data[i * 4 + 1] = 0
//			// blah.data[i * 4 + 2] = 0
//		}
//	}
////            i = 129241 ;
////			var h = 50,w=50;
////			for(var dx = -h; dx <= h; dx++){
////				for(var dy = -w; dy <= w; dy++){
////						mask_u8[i + dx + dy * width] = 1;
////				}
////			}
//
////    var canvas_objects = canvas.getObjects();
////     for (i =0; i < canvas_objects.length;i++)
////     {
////         item = canvas_objects[i];
////         if (item.type == 'rect')
////         {
////             item.opacity = 0;
////         }
//////     }
////    canvas.deactivateAll().renderAll();
////    var blah  = canvas_main_ctx.getImageData(0, 0, canvas_jsfeat.height, canvas_jsfeat.width);
//
//	for(var channel = 0; channel < 3; channel++){
//		var img_u8 = new Uint8Array(width * height);
//		for(var n = 0; n < blah.data.length; n+=4){
//			img_u8[n / 4] = blah.data[n + channel]
//		}
//		InpaintTelea(width, height, img_u8, mask_u8);
//		for(i = 0; i < img_u8.length; i++){
//			blah.data[4 * i + channel] = img_u8[i]
//		}
//	}
//	for(i = 0; i < img_u8.length; i++){
//		blah.data[4 * i + 3] = 255;
//	}
//    ctx.putImageData(blah, 0, 0);
//    };

  $scope.jsfeat_canny = function() {
      var demo_opt = function () {
          this.blur_radius = 2;
          this.low_threshold = 20;
          this.high_threshold = 50;

      };
      if (gui_canny.is(':hidden')) {
          options = new demo_opt();
          $scope.jsfeat_gui_canny.add(options, 'blur_radius', 0, 4).step(1);
          $scope.jsfeat_gui_canny.add(options, 'low_threshold', 1, 127).step(1);
          $scope.jsfeat_gui_canny.add(options, 'high_threshold', 1, 127).step(1);
          gui_canny.show()
      }
      var ctx, canvasWidth, canvasHeight;
      var img_u8;
      canvas.deactivateAll().renderAll();
      canvasWidth = document.getElementById('canvas1').width;
      canvasHeight = document.getElementById('canvas1').height;
      ctx = document.getElementById('canvas1').getContext('2d');
      ctx.fillStyle = "rgb(0,255,0)";
      ctx.strokeStyle = "rgb(0,255,0)";
      img_u8 = new jsfeat.matrix_t(canvasHeight, canvasWidth, jsfeat.U8C1_t);
      ctx = document.getElementById('canvas').getContext('2d');
      var imageData = ctx.getImageData(0, 0, canvasHeight, canvasWidth);
      jsfeat.imgproc.grayscale(imageData.data, img_u8.data);
      var r = options.blur_radius | 0;
      var kernel_size = (r + 1) << 1;
      jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);
      jsfeat.imgproc.canny(img_u8, img_u8, options.low_threshold | 0, options.high_threshold | 0);
      // render result back to canvas
      var data_u32 = new Uint32Array(imageData.data.buffer);
      var alpha = (0xff << 24);
      var i = img_u8.cols * img_u8.rows, pix = 0;
      while (--i >= 0) {
          pix = img_u8.data[i];
          data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
      }
      document.getElementById('canvas1').getContext('2d').putImageData(imageData, 0, 0);
  };

$scope.segmentation_slic = function() {
  var ctx, canvasWidth, canvasHeight;
  var slic_opt = function () {
    this.regionSize = 40;
    this.minSize = 20;
    };
  var callback  = function(results){
            debug.slic = results;
            var context = output_canvas.getContext('2d');
            var imageData = context.createImageData(output_canvas.width, output_canvas.height);
            var data = imageData.data;
            var color = {};
            for (var i = 0; i < results.indexMap.length; ++i) {
                var value = results.indexMap[i];
                if (results.indexMap[i-1] == results.indexMap[i]){
                    data[4 * i + 0] = results.rgbData[4 * i + 0];
                    data[4 * i + 1] = results.rgbData[4 * i + 1];
                    data[4 * i + 2] = results.rgbData[4 * i + 2];
                    if (value%2 ==0){
                        data[4 * i + 3] =  255;
                    }
                    else
                    {
                        data[4 * i + 3] =  127;
                    }
                }
                else{
                    data[4 * i + 0] = 255;
                    data[4 * i + 1] = 255;
                    data[4 * i + 2] = 255;
                    data[4 * i + 3] = 255;
                }

            }
            context.putImageData(imageData, 0, 0);
        };
    if (gui_slic.is(':hidden')){
        slic_options = new slic_opt();
        $scope.jsfeat_gui_slic.add(slic_options, "regionSize", 20, 400);
        $scope.jsfeat_gui_slic.add(slic_options, "minSize", 2, 100);
        gui_slic.show()
    }
    canvas.deactivateAll().renderAll();
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvasHeight, canvasWidth);
    console.log("starting SLIC");
    console.log(slic_options.regionSize);
    slic_options.callback = callback;
    SLICSegmentation(imageData,slic_options);
    console.log("finished SLIC");
};

$scope.segmentation_pf = function() {
  var ctx, canvasWidth, canvasHeight;
  var pf_opt = function () {
    this.sigma = 0.5;
    this.threshold = 1000;
    this.minSize = 1000;

    };
  var callback  = function(results){
            debug.pf = results;
            var context = output_canvas.getContext('2d');
            var imageData = context.createImageData(output_canvas.width, output_canvas.height);
            var data = imageData.data;
            var segment = {};
            var w = output_canvas.width,h= output_canvas.height;
            for (var i = 0; i < results.indexMap.length; ++i) {
                var value = results.indexMap[i];
                if (!segment.hasOwnProperty(value))
                {
                    segment[value] =
                        {'r':Math.round(255*Math.random()),
                        'g':Math.round(255*Math.random()),
                        'b':Math.round(255*Math.random()),
                        'min_pixel':i,
                        'max_pixel':i,
                        'min_x':Math.floor(i/w),
                        'min_y':i%w,
                        'max_x':Math.floor(i/w),
                        'max_y':i%w
                        }
                }
                if (value ==0){
                    data[4 * i + 0] = results.rgbData[4 * i + 0];
                    data[4 * i + 1] = results.rgbData[4 * i + 1];
                    data[4 * i + 2] = results.rgbData[4 * i + 2];
                    data[4 * i + 3] = 255;

                }
                else{
                    data[4 * i + 0] = 0;
                    data[4 * i + 1] = 0;
                    data[4 * i + 2] = 0;
                    data[4 * i + 3] = 0;
                }
                    segment[value].max_pixel = i;
//                    x,y = Math.floor(i/w)
            }
            results.segment=segment;
            context.putImageData(imageData, 0, 0);
        };
    if (gui_pf.is(':hidden')){
        pf_options = new pf_opt();
        $scope.jsfeat_gui_pf.add(pf_options, "threshold", 20, 20000);
        $scope.jsfeat_gui_pf.add(pf_options, "sigma", 0, 20);
        $scope.jsfeat_gui_pf.add(pf_options, "minSize", 2, 5000);
        gui_pf.show()
    }
    canvas.deactivateAll().renderAll();
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, canvasHeight, canvasWidth);
    console.log("starting PF");
    console.log(pf_options.regionSize);
    pf_options.callback = callback;
    PFSegmentation(imageData,pf_options);
    console.log("finished PF");
};

  $scope.jsfeat_yape = function(){
    var yape_opt = function(){
        this.lap_thres = 30;
        this.eigen_thres = 25;
    };
    if (gui_yape.is(':hidden')){
        yape_options = new yape_opt();
        $scope.jsfeat_gui_yape.add(yape_options, "lap_thres", 1, 100);
        $scope.jsfeat_gui_yape.add(yape_options, "eigen_thres", 1, 100);
        gui_yape.show()
    }
    var ctx,canvasWidth,canvasHeight,img_u8,imageData,corners, i,count,data_u32;
    canvas.deactivateAll().renderAll();
    canvasWidth  = document.getElementById('canvas1').width;
    canvasHeight = document.getElementById('canvas1').height;
    ctx = document.getElementById('canvas1').getContext('2d');
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.strokeStyle = "rgb(0,255,0)";
    img_u8 = new jsfeat.matrix_t(canvasHeight, canvasWidth, jsfeat.U8_t | jsfeat.C1_t);
    imageData = document.getElementById('canvas').getContext('2d').getImageData(0, 0, canvasHeight, canvasWidth);
    corners = [];
    i = canvasHeight*canvasWidth;
    while(--i >= 0) {
        corners[i] = new jsfeat.point2d_t(0,0,0,0);
    }
    jsfeat.imgproc.grayscale(imageData.data, img_u8.data);
    jsfeat.imgproc.box_blur_gray(img_u8, img_u8, 2, 0);
    jsfeat.yape06.laplacian_threshold = yape_options.lap_thres|0;
    jsfeat.yape06.min_eigen_value_threshold = yape_options.eigen_thres|0;
    count = jsfeat.yape06.detect(img_u8, corners);
    console.log(count);
    data_u32 = new Uint32Array(imageData.data.buffer);
    render_corners(corners, count, data_u32, canvasHeight);
//    debug.yape = corners;
    function render_corners(corners, count, img, step) {
        var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
        for(var i=0; i < count; ++i)
        {
            var x = corners[i].x;
            var y = corners[i].y;
            var off = (x + y * step);
            img[off] = pix;
            img[off-1] = pix;
            img[off+1] = pix;
            img[off-step] = pix;
            img[off+step] = pix;
        }
    }
    document.getElementById('canvas1').getContext('2d').putImageData(imageData, 0, 0);
  }


}

function watchCanvas($scope) {

  function updateScope() {
    $scope.$$phase || $scope.$digest();
    canvas.renderAll();
  }

  canvas
    .on('object:selected', updateScope)
    .on('group:selected', updateScope)
    .on('path:created', updateScope)
    .on('selection:cleared', updateScope);
}

cveditor.controller('CanvasControls', function($scope) {
  $scope.jsfeat_gui_pf = jsfeat_gui_pf;
  $scope.jsfeat_gui_canny = jsfeat_gui_canny;
  $scope.jsfeat_gui_yape = jsfeat_gui_yape;
  $scope.jsfeat_gui_slic = jsfeat_gui_slic;
  $scope.js_console = js_console;
  $scope.canvas = canvas;
  $scope.output_canvas = output_canvas;
  $scope.getActiveStyle = getActiveStyle;
  addAccessors($scope);
  watchCanvas($scope);
});
