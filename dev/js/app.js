/**
 *
 */
var APPKEY = 'PdKT';

function PosKeyboardTester() {
    var app = window[APPKEY].init();
    return app;
}

window[APPKEY] = (function() {
    'use strict';

    // ------------------------------------------------------------------------------------------------------ PROPERTIES

    var CFG      = {},
        modules      = {};

    // --------------------------------------------------------------------------------------------------------- modulesULES

    /**
     * Appends a given module object.
     *
     * @param   {object} module
     * @returns {void}
     */
    function appendModule(module) {
        var id;

        if ((!module) || (typeof module !== 'object')) {
            console.error('Parameter <module> is not a valid PerspectiveView module :: ', '{' , typeof module, '} :: ', module);
        }

        for (id in module) {
            if (module.hasOwnProperty(id) && modules.hasOwnProperty(id)) {
                console.error('There already exists a module named \'' + id + '\'');
            }
            else {
                modules[id] = module[id];
            }
        }
    }


    /**
     * Initializes all appended modules. Will call all init methods of the appended modules with the given
     * configuration.
     *
     * @param   config
     * @returns {void}
     */
    function initModules(config) {
        var i;

        for (i in modules) {
            if (modules.hasOwnProperty(i)) {
                if (typeof modules[i].init === 'function') {
                    modules[i].init(config);
                }
            }
        }
    }


    /**
     * Calls all run methods of the appended modules.
     *
     * @returns {void}
     */
    function runModules() {
        var i;

        for (i in modules) {
            if (modules.hasOwnProperty(i)) {
                if (typeof modules[i].run === 'function') {
                    modules[i].run();
                }
            }
        }
    }


    /**
     * Updates all appended modules. Will call all update methods of the appended modules with the given configuration.
     *
     * @param   config
     * @returns {void}
     */
    function updateModules(config) {
        var i;

        for (i in modules) {
            if (modules.hasOwnProperty(i)) {
                if (typeof modules[i].update === 'function') {
                    modules[i].update(config);
                }
            }
        }
    }


    /**
     * Returns all modules.
     *
     * @returns {object}
     */
    function getModules() {
        return modules;
    }


    /**
     * Returns a requested module by the given id.
     *
     * @param   {string} id - ID of the requested module
     * @returns {object}
     */
    function getModule(id) {
        if (modules[id]) {
            return modules[id];
        }
        else {
            console.warn('The requested module <' + id + '> does not exist!');
            return null;
        }
    }

    // ------------------------------------------------------------------------------------------------------------ INIT

    /**
     * Initialize this app.
     *
     * @param   {object} config
     * @returns {{render: render, update: update}}
     */
    function init(config) {
        CFG = modules.merge.deep({}, config||{});

        initModules(CFG);
        runModules();

        modules.loader.loadKeyboardLayoutConfig('data/layouts/test_layout.jsons')
            .fail(function() {

            })
            .done(function () {

            });

        /*
        modules.loader.loadKeyboardLayoutConfig('data/layouts/test_layout.jsons', function onCallback(err, data) {
            if (!err) {
                console.info('Layout file has been loaded.');

            }
            else {
                console.warn('Layout file has not been loaded!', data);
            }
        });
        */

        return {};
    }

    // ----------------------------------------------------------------------------------------------------- DEV RETURNS

    return {
        configuration : CFG,
        modules       : modules,
        appendModule  : appendModule,
        getModules    : getModules,
        getModule     : getModule,
        init          : init
    };
})();
