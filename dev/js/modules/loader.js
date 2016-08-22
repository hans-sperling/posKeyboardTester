/**
 *
 */
;(function loader(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    // App internals
    var modules = app.getModules();

    // ------------------------------------------------------------------------------------------------ Module interface

    /**
     * Initializes this module - will be called at the beginning from the app. Updates the module with the given config.
     *
     * @public
     * @param {Object} config
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
        // Nothing to do yet
    }

    // --------------------------------------------------------------------------------------------------------- Methods

    /**
     * Gets the content of the requested json file. On success the callback function will be called without the error
     * flag but with the content data, on failure with the error flag and the error message as content data.
     *
     * @param  {String}   file - File path of the requested json file
     * @param  {Function} callback - Callback function
     */
    function loadKeyboardLayoutConfig(file, callback) {
        var cb = isFunction(callback) ? callback : function() {};

        $.getJSON(file)
            .done(function (data) {
                cb(false, data);
            })
            .fail(function(jqxhr, textStatus, error) {
                console.warn('Request Failed: ' + textStatus + ', ' + error);
                cb(true, error);
            });
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ loader : {
        init                     : init,
        run                      : run,
        update                   : update,
        loadKeyboardLayoutConfig : loadKeyboardLayoutConfig
    }});
})(window[APPKEY]);
