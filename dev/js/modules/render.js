/**
 *
 */
;(function render(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    var merge    = app.getModule('merge'),
        canvas   = null,
        context  = null,
        unitSize = 50;

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
        var cfg  = config,
            size = getStageSize(Number(cfg.keyboard.dimension.x), Number(cfg.keyboard.dimension.y));

        canvas.style.background = cfg.keyboard.background;
        resizeStage(size.width, size.height);
        renderKeys(cfg.keys, Number(cfg.keyboard.margin));
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
     *
     * @param  {Number} width
     * @param  {Number} height
     */
    function resizeStage(width, height) {
        canvas.width  = width;
        canvas.height = height;

        canvas.style.width  = width  + 'px';
        canvas.style.height = height + 'px';
    }


    /**
     * Renders all keys of the keyboard.
     *
     * @param  {Array}  keys   - List of all keys
     * @param  {Number} margin - Margin of all keys
     */
    function renderKeys(keys, margin) {
        var i;

        for (i in keys) {
            if(keys.hasOwnProperty(i)) {
                drawKey(keys[i], margin);
            }
        }
    }


    /**
     * Draws a given key of the keyboard with all its properties.
     *
     * @param {Object} key    - Key-Object
     * @param {Number} margin - Margin of the key
     */
    function drawKey(key, margin) {
        var start = {
                x : (Number((key.pos.x) - 1) * unitSize) + margin,
                y : (Number((key.pos.y) - 1) * unitSize) + margin
            },
            end = {
                x : (start.x + (Number(key.dimension.x) * unitSize) - (2 * margin)),
                y : (start.y + (Number(key.dimension.x) * unitSize) - (2 * margin))
            };

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
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ render : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
