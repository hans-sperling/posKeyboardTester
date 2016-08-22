/**
 *
 */
;(function keyboardData(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    // App internals
    var modules = app.getModules();

    // Module internals
    var originalData = {},
        dimension    = { x : 0, y : 0},
        keys         = [];

    // ------------------------------------------------------------------------------------------------ Module interface

    /**
     * Initializes this module - will be called at the beginning from the app. Updates the module with the given config.
     *
     * @public
     * @param {object} config
     * @return {void}
     */
    function init(config) {
        update(config);
    }


    /**
     * Will be called from app if all other modules has been loaded.
     *
     * @public
     * @return {void}
     */
    function run() {
        // ...
    }


    /**
     * Updates this module, will be called on init and on general updating the app.
     *
     * @public
     * @pram {object} config
     * @return {void}
     */
    function update(config) {
        // Nothing to do yet
    }

    // --------------------------------------------------------------------------------------------------------- Methods


    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ keyboardData : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
