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
        // Nothing to do yet
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

        return {
            fail: function() {
                console.log('fail');
            },
            done : function () {
                console.log('done');

            }
        }
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
