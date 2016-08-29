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
        keyCounter    = 0,
        keyStrokes    = [],
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
        render = app.getModule('render');
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
        $toggleButton.on('click.testing', function(e2) {
            e2.preventDefault();

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

            // Test starts
            keyboard  = app.getModule('keyboard');
            keyIndexes = keyboard.getSortedKeyIndexes();
        });

        $toggleButton.on('blur.testing', function(e) {
            if (isTesting) {
                isPaused = true;

                $toggleButton
                    .removeClass('active')
                    .addClass('paused')
                    .html('Paused...');
            }
        });

        $toggleButton.on('keydown.testing', function(e) {
            e.preventDefault();
            var key = e.which || e.keyCode || e.charCode;
            e       = e || window.e;

            keyCounter++;
            keyStrokes.push(key);
        });

        $toggleButton.on('keyup.testing', function(event) {
            event.preventDefault();
            var indexString = '',
                key = event.which || event.keyCode || event.charCode;
            event   = event || window.event;

            setTimeout(function() {
                keyCounter--;
                if (keyCounter == 0) {
                    indexString = pressedKeyExists(keyStrokes);

                    var key = keyboard.getKey(indexString);
                    
                    render.removeKey(key);
                    keyStrokes = [];

                    return indexString;
                }
            }, 30);
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
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
