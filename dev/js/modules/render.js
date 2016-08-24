/**
 *
 */
;(function render(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    var merge    = app.getModule('merge').deep,
        canvas   = null,
        context  = null,
        defaultConfig = {
            dimension       : { x : 1, y : 1 },
            backgroundColor : 'rgb(255, 255, 255)',
            borderColor     : 'rgb(0, 0, 0)',
            textColor       : 'rgb(0, 0, 0)',
            textAlign       : 'center',
            font            : 'Arial',
            rotation        : 0,
            fontSize        : 14,
            margin          : 2
        },
        _unitSize        = 50,
        _dimension       = null,
        _backgroundColor = null,
        _borderColor     = null,
        _textColor       = null,
        _textAlign       = null,
        _font            = null,
        _rotation        = null,
        _margin          = null,
        _fontSize        = null;

    // ------------------------------------------------------------------------------------------------ Module interface

    /**
     * Initializes this module - will be called at the beginning from the app. Updates the module with the given config.
     *
     * @public
     * @param  {Object} config
     * @return {void}
     */
    function init(config) {
        canvas        = document.getElementById('Stage');
        context       = canvas.getContext('2d');

        //update(config);
    }


    /**
     * Will be called from app if all other modules has been loaded.
     *
     * @public
     * @return {void}
     */
    function run() {
        // Nothing to do yet
    }


    /**
     * Updates this module, will be called on init and on general updating the app.
     *
     * @public
     * @param  {Object} config
     * @return {void}
     */
    function update(config) {
        var cfg  = merge(defaultConfig, config);

        _dimension = {
            x : Number(cfg.keyboard.dimension.x),
            y : Number(cfg.keyboard.dimension.y)
        };
        _backgroundColor = cfg.keyboard.backgroundColor;
        _borderColor     = cfg.keyboard.borderColor;
        _textColor       = cfg.keyboard.textColor;
        _textAlign       = cfg.keyboard.textAlign;
        _font            = cfg.keyboard.font;
        _margin          = cfg.keyboard.margin;
        _fontSize        = cfg.keyboard.fontSize;

        canvas.style.background = _backgroundColor;
        resizeStage();
        renderKeys(cfg.keys);
    }

    // --------------------------------------------------------------------------------------------------------- Methods

    /**
     * Returns the computed width and height of the stage.
     *
     * @param  {Number} keyAmountX
     * @param  {Number} keyAmountY
     * @return {{width: number, height: number}}
     */
    function getStageSize(keyAmountX, keyAmountY) {
        return {
            width  : _unitSize * keyAmountX,
            height : _unitSize * keyAmountY
        };
    }


    /**
     * Resize the stage width the given width and height.
     */
    function resizeStage() {
        var size = getStageSize(_dimension.x, _dimension.y);

        canvas.width        = size.width;
        canvas.height       = size.height;
        canvas.style.width  = size.width  + 'px';
        canvas.style.height = size.height + 'px';
    }


    /**
     * Renders all keys of the keyboard.
     *
     * @param  {Array}  keys     - List of all keys
     */
    function renderKeys(keys) {
        var i;

        for (i in keys) {
            if(keys.hasOwnProperty(i)) {
                drawKey(keys[i]);
            }
        }
    }


    /**
     * Draws a given key of the keyboard with all its properties.
     *
     * @param {Object} key      - Key-Object
     */
    function drawKey(key) {
        var start = {
                x : (Number((key.pos.x) - 1) * _unitSize) + _margin,
                y : (Number((key.pos.y) - 1) * _unitSize) + _margin
            },
            end = {
                x : (start.x + (Number(key.dimension.x) * _unitSize) - (2 * _margin)),
                y : (start.y + (Number(key.dimension.y) * _unitSize) - (2 * _margin))
            },
            center = {
                x : (start.x + ((end.x - start.x) / 2)),
                y : (start.y + ((end.y - start.y) / 2))
            },
            fontSize  = ((key.fontSize)  ? key.fontSize : _fontSize),
            textColor = ((key.textColor) ? key.textColor: _textColor);

        // Key frame and colors
        context.save();
        context.fillStyle   = '#' + key.background;
        context.strokeStyle = '#000000';
        context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineTo(start.x, end.y);
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();


        context.save();
        context.textAlign = (key.textAlign) ? key.textAlign : _textAlign;

        if (key.caption.encoding.toLowerCase() === 'string') {
            drawString(context, key.caption.data, center.x, center.y, textColor, key.rotation, _font, fontSize);
        }
        else if (key.caption.encoding.toLowerCase() == 'unicode') {
            context.translate(center.x, center.y);
            context.rotate(key.rotation * Math.PI / 180);
            context.fillStyle = '#' + key.backgroundColor;
            context.font      = _font + ' ' + fontSize + 'px';

            var tmp = '';
            for (var j = 0 ; j < key.caption.data.length; j++) {
                if (tmp != '') { tmp += ',' }
                tmp += key.caption.data[j];
            }
            context.fillText(String.fromCharCode(tmp), 0,0);
        }
            context.restore();
    }


    /*
     * Draws a multiline string rotated in a canvas
     *
     * @param ctx (M) context of the canvas
     * @param text (M) string may contain \n
     * @param posX (M) horizontal start position
     * @param posY (M) vertical start position
     * @param textColor color
     * @param rotation in degrees (by 360)
     * @param font must be installed on client use websafe
     * @param fonSize in Pixels
     */
    function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
        var i, lines = text.split("\n");

        if (!rotation)  rotation  = 0;
        if (!font)      font      = "'serif'";
        if (!fontSize)  fontSize  = 14;
        if (!textColor) textColor = '#000000';

        ctx.font      = font + ' ' + fontSize + 'px';
        console.log(font + ' ' + fontSize + 'px');
        ctx.fillStyle = textColor;

        ctx.translate(posX, posY);
        ctx.rotate(rotation * Math.PI / 180);

        for (i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 0, (i * fontSize));
        }
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ render : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
