/**
 *
 */
;(function test(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    var keyIndexes = [],
        isTesting  = false,
        keyCounter = 0,
        keyStrokes = [];

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
        var $toggleButton = $('#ToggleTest'),
            $layout       = $('#Layout');

        $layout.on('change', function(e1) {
            // ...
        });


        $toggleButton.on('click', function(e2) {
            e2.preventDefault();

            isTesting = !isTesting;


            if ($toggleButton.hasClass('active')) {
                $toggleButton.removeClass('active')
                             .removeClass('paused')
                             .html('Start test');
            }
            else {
                $toggleButton.html('Testing ...')
                             .removeClass('paused')
                              .addClass('active');

                // Test starts
                keyIndexes = app.getModule('keyboard').getSortedKeyIndexes();
            }
        });

        $toggleButton.on('blur', function(e) {
            $toggleButton.removeClass('active')
                         .addClass('paused')
                         .html('Paused...');
        });

        $toggleButton.on('keydown', function(e) {
            e.preventDefault();
            var key = e.which || e.keyCode || e.charCode;
            e       = e || window.e;

            keyCounter++;
            keyStrokes.push(key);
        });

        $toggleButton.on("keyup", function(event) {
            event.preventDefault();
            var key = event.which || event.keyCode || event.charCode;
            event   = event || window.event;

            setTimeout(function() {
                keyCounter--;
                if (keyCounter == 0) {
                    pressedKeyExists(keyStrokes);
                    console.log('KeyPressed', keyStrokes);
                    keyStrokes = [];
                }
            }, 30);
        });
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

    function pressedKeyExists(pressedKey) {
        for (var i in keyIndexes) {
            if (keyIndexes.hasOwnProperty(i)) {
                if (keyIndexes[i][0] == pressedKey.sort().join('-')) {
                    console.log('ja')
                }
            }
        }
    }

    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ test : {
        init      : init,
        run       : run,
        update    : update
    }});
})(window[APPKEY]);
