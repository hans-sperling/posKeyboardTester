/**
 *
 */
;(function keyboardData(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    // App internals
    var modules = app.getModules();

    // Module internals
    var originalData = {}, // Stores the original configuration of the keyboard config file
        listData     = []; // Stores an array formatted configuration of the keyboard.
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
        loadConfig('./data/layouts/test_layout.json');

        console.log(originalData);
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

    function loadConfig(file) {

        $.getJSON(file, function (data) {
            originalData = {};
            originalData = modules.merge.deep(originalData, data);
            console.log(originalData);
        });

        // todo - Is it better to use the native ajax request method of jquery, because of the error handing of ajax?
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ keyboardData : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
