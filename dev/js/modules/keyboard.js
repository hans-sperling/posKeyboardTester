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

    /**
     * Returns all keys, input sorted as string and split by minus-char with their index location in the keys-list.
     *
     * @returns {Array}
     */
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


    /**
     * Returns the key object at the given index location or false if the index dose not exists.
     *
     * @param   {Number} index - Index location in the keys-list
     * @returns {Boolean|Object}
     */
    function getKeyByIndex(index) {
        if (keys.hasOwnProperty(index)) {
            return keys[index];
        }

        return false;
    }


    /**
     * Returns the key object at the given position from the keyboard layout or false if the index dose not exists.
     *
     * @param   {Object} position - XY-Position-Object
     * @returns {Boolean|Object}
     */
    function getKeyByPosition(position) {
        var i, key;

        for (i in keys) {
            if (keys.hasOwnProperty(i)) {
                key = keys[i];

                if (   (isObject(key.pos))
                    && (key.pos.x == position.x)
                    && (key.pos.y == position.y)) {

                    return key;
                }
            }
        }

        return false;
    }


    /**
     * Returns the key objects with the same input as the given keystroke or false if the index dose not exists.
     *
     * @param   {Array} keyStroke - List of inputs
     * @returns {Boolean|Object}
     */
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
