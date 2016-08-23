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
            size = getStageSize(cfg.keyboard.dimension.x, cfg.keyboard.dimension.y);

        resizeStage(size.width, size.height);

        for (var i in cfg.keys) {
            var key;

            if(cfg.keys.hasOwnProperty(i)) {
                key = cfg.keys[i];

                drawKey(key.pos, key.dimension);
            }
        }
    }


    function drawKey(pos, dismension) {
        context.save();
        context.fillStyle = 'rgb(63, 127, 255)';
        context.fillRect(
            (pos.x - 1) * unitSize + 2,
            (pos.y - 1) * unitSize + 2,
            dismension.x * unitSize - 4,
            dismension.y * unitSize - 4
        );
        context.restore();
    }


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
        var $canvas = $('#Stage');

        $canvas.width(width);
        $canvas.height(height);
    }

    // --------------------------------------------------------------------------------------------------------- Methods

    function renderKeys(keys) {

    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ render : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
