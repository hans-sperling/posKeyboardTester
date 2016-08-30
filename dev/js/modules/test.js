/**
 *
 */
;(function test(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    var render        = null,
        keyboard      = null,
        keyIndexes    = [],
        isTesting     = false,
        isPaused      = false,
        keyStrokes    = [],
        strokedKeys   = [],
        $toggleButton = null,
        $layout       = null;

    // ------------------------------------------------------------------------------------------------ Module interface

    /**
     * Initializes this module - will be called at the beginning from the app. Updates the module with the given config.
     *
     * @public
     * @param  {Object} config
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
        render        = app.getModule('render');
        $toggleButton = $('#ToggleTest');
        $layout       = $('#Layout');

        $layout.on('change', function(e1) {
            // ...
        });

        addInteractionEvents();

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
     *
     */
    function addInteractionEvents() {
        $toggleButton.on('click.testing', function(e) {
            e.preventDefault();

            // Test starts
            keyboard  = app.getModule('keyboard');
            keyIndexes = keyboard.getSortedKeyIndexes();

            if (!isTesting && !isPaused) {
                isTesting = true;
                isPaused  = false;

                $toggleButton
                    .addClass('active')
                    .removeClass('paused')
                    .html('Stop testing');
            }
            else if (isTesting && !isPaused) {
                isTesting = false;
                isPaused  = false;

                $toggleButton
                    .removeClass('active')
                    .removeClass('paused')
                    .html('Start test')
                    .blur();
            }
            else if (isTesting && isPaused) {
                isTesting = true;
                isPaused  = false;

                $toggleButton
                    .addClass('active')
                    .removeClass('paused')
                    .html('Stop testing');
            }
        });

        $toggleButton.on('blur.testing', function() {
            if (isTesting) {
                isPaused = true;

                $toggleButton
                    .removeClass('active')
                    .addClass('paused')
                    .html('Paused...');
            }
        });

        $toggleButton.on('keydown.testing', function(e) {
            e = e || window.e;
            e.preventDefault();

            var isNewKey = true,
                key      = e.which || e.keyCode || e.charCode;

            for (var i in keyStrokes) {
                if (keyStrokes.hasOwnProperty(i) && keyStrokes[i] == key) {
                    isNewKey = false;
                    break;
                }
            }

            if (isNewKey) {
                keyStrokes.push(key);
            }
        });

        $toggleButton.on('keyup.testing', function(e) {
            e = e || window.e;
            e.preventDefault();

            var indexString = pressedKeyExists(keyStrokes),
                keyConfig   = {},
                key         = e.which || e.keyCode || e.charCode;

            if (key >= 0) {
                keyConfig = keyboard.getKey(indexString);

                // @todo - To prevent hiding the key twice or more, it is necessary to create a list of all pressed keys
                if (keyConfig) {
                    render.removeKey(keyConfig);
                }

                keyStrokes = [];
            }

            return indexString;
        });
    }


    /**
     *
     * @param {Array} pressedKeys
     */
    function pressedKeyExists(pressedKeys) {
        var strokeString = '';

        for (var i in keyIndexes) {
            if (keyIndexes.hasOwnProperty(i)) {
                strokeString = pressedKeys.sort().join('-');

                if (keyIndexes[i][0] == strokeString) {

                    return i;
                }
            }
        }
        return -1;
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ test : {
        init   : init,
        run    : run,
        update : update
    }});
})(window[APPKEY]);
