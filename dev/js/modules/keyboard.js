/**
 *
 */
;(function keyboard(app) {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ Properties

    // App internals
    var merge = app.getModule('merge').deep;

    // Module internals
    var defaultConfig = {
            keyboard: {
                dimension : { x : 0, y : 0}
            },
            keys : []
        },
        dimension = { x : 0, y : 0},
        keys = [];


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
        var cfg = merge(defaultConfig, config);

        dimension = {
            x : Number(cfg.keyboard.dimension.x),
            y : Number(cfg.keyboard.dimension.y)
        };
        keys      = cfg.keys;

    }

    // --------------------------------------------------------------------------------------------------------- Methods

    function getSortedKeyIndexes() {
        var i, result = [];

        for (i in keys) {
            if (keys.hasOwnProperty(i)) {
                var sortedKeys = keys[i].input.sort();

                //result.push([sortedKeys.join('-'), i]);
                result.push({
                    index      : i,
                    sortedKeys : sortedKeys.join('-'),
                    pos        : keys[i].pos
                });
            }
        }
        return result;
    }


    function getKeyByIndex(index) {
        if (keys.hasOwnProperty(index)) {
            return keys[index];
        }

        return false;
    }


    function getKeyByPosition(position) {
        var i, key;

        for (i in keys) {
            if (keys.hasOwnProperty(i)) {
                key = keys[i];
                if (   (isObject(key.pos))
                    && (isObject(key.pos.x) && key.pos.x == position.x)
                    && (isObject(key.pos.y) && key.pos.x == position.x)) {

                    return key;
                }
            }
        }

        return false;
    }


    function getKeysByKeystroke(keyStroke) {
        var i, key, keyStrokeString, keyString,
            validKeys = [];

        if (!isArray(keyStroke)) {
            return false;
        }

        keyStrokeString = keyStroke.sort().join('-');

        for (i in keys) {
            if (keys.hasOwnProperty(i)) {
                key = keys[i];
                if (!isArray(key.input)) {
                    continue;
                }

                keyString = key.input.sort().join('-');

                if (keyStrokeString == keyString) {
                    validKeys.push(key);
                }
            }
        }

        if (validKeys.length <= 0) {
            return false;
        }

        return validKeys;
    }


    // --------------------------------------------------------------------------------------------------------- Returns

    // Append module with public methods and properties
    app.appendModule({ keyboard : {
        init   : init,
        run    : run,
        update : update,

        getSortedKeyIndexes : getSortedKeyIndexes,
        getKeyByIndex       : getKeyByIndex,
        getKeyByPosition    : getKeyByPosition,
        getKeysByKeystroke  : getKeysByKeystroke
    }});
})(window[APPKEY]);
