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
            keyboard : {
                dimension : { x : 0, y : 0 }
            },
            defaults : {
                backgroundColor : 'rgb(255, 255, 255)',
                borderColor : 'rgb(0, 0, 0)',
                dimension : {x : 1, y : 1},
                font : 'Arial',
                fontSize : 14,
                margin : 2,
                rotation : 0,
                textAlign : 'center',
                textColor : 'rgb(0, 0, 0)'
            }
        },
        unitSize = 50,
        fallback = {
            backgroundColor   : '',
            borderColor       : '',
            dimension         : {},
            font              : '',
            fontSize          : 0,
            keyboardDimension : {},
            margin            : 0,
            rotation          : 0,
            textAlign         : '',
            textColor         : ''
        };

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

        fallback.keyboardDimension = {
            x : Number(cfg.keyboard.dimension.x),
            y : Number(cfg.keyboard.dimension.y)
        };
        fallback.dimension = {
            x : Number(cfg.defaults.dimension.x),
            y : Number(cfg.defaults.dimension.y)
        };
        fallback.backgroundColor = cfg.defaults.backgroundColor;
        fallback.borderColor     = cfg.defaults.borderColor;
        fallback.font            = cfg.defaults.font;
        fallback.fontSize        = cfg.defaults.fontSize;
        fallback.margin          = cfg.defaults.margin;
        fallback.textAlign       = cfg.defaults.textAlign;
        fallback.textColor       = cfg.defaults.textColor;

        canvas.style.background = fallback.backgroundColor;
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
            width  : unitSize * keyAmountX,
            height : unitSize * keyAmountY
        };
    }


    /**
     * Resize the stage width the given width and height.
     */
    function resizeStage() {
        var size = getStageSize(fallback.keyboardDimension.x, fallback.keyboardDimension.y);

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
        var start, end, center,
            backgroundColor = ((key.backgroundColor) ? key.backgroundColor : fallback.backgroundColor),
            borderColor     = ((key.borderColor)     ? key.borderColor     : fallback.borderColor),
            dimension       = ((key.dimension)       ? key.dimension       : fallback.dimension),
            font            = ((key.font)            ? key.font            : fallback.font),
            fontSize        = ((key.fontSize)        ? key.fontSize        : fallback.fontSize),
            margin          = ((key.margin)          ? key.margin          : fallback.margin),
            textAlign       = ((key.textAlign)       ? key.textAlign       : fallback.textAlign),
            textColor       = ((key.textColor)       ? key.textColor       : fallback.textColor),
            rotation        = ((key.rotation)        ? key.rotation        : fallback.rotation);

        start = {
            x : (Number((key.pos.x) - 1) * unitSize) + margin,
            y : (Number((key.pos.y) - 1) * unitSize) + margin
        };
        end = {
            x : (start.x + (Number(dimension.x) * unitSize) - (2 * margin)),
            y : (start.y + (Number(dimension.y) * unitSize) - (2 * margin))
        };
        center = {
            x : (start.x + ((end.x - start.x) / 2)),
            y : (start.y + ((end.y - start.y) / 2))
        };

        drawKeyFrame(context, start, end, backgroundColor, borderColor);
        drawCaption(context, key.caption, center.x, center.y, textColor, textAlign, rotation, font, fontSize);
    }


    function drawKeyFrame(ctx, startPos, endPos, backgroundColor, borderColor) {
        ctx.save();

        ctx.fillStyle   = backgroundColor;
        ctx.strokeStyle = borderColor;

        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x,   startPos.y);
        ctx.lineTo(endPos.x,   endPos.y);
        ctx.lineTo(startPos.x, endPos.y);
        ctx.closePath();

        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }


    /**
     *
     * @param ctx
     * @param caption
     * @param posX
     * @param posY
     * @param textColor
     * @param textAlign
     * @param rotation
     * @param font
     * @param fontSize
     */
    function drawCaption(ctx, caption, posX, posY, textColor, textAlign, rotation, font, fontSize) {
        var lines, i, tmp = '';

        ctx.save();

        ctx.font      = fontSize + 'px ' + font;
        ctx.fillStyle = textColor;
        ctx.textAlign = textAlign;

        ctx.translate(posX, posY);
        ctx.rotate(rotation * Math.PI / 180);

        if (typeof caption === 'string') {
            lines = caption.split("\n");

            for (i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], 0, (i * fontSize));
            }
        }
        else if (typeof caption === 'object') {
            for (i = 0 ; i < caption.length; i++) {
                if (tmp != '') { tmp += ',' }
                tmp += caption[i];
            }

            context.fillText(String.fromCharCode(tmp), 0,0);
        }

        ctx.restore();
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ render : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
