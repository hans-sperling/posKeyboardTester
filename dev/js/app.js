/**
 *
 */
function PosKeyboardTester() {

    // ------------------------------------------------------------------------------------------------------ Properties

    var config = {};

    // ------------------------------------------------------------------------------------------------ Internal methods

    function loadConfig(file) {
        $.getJSON(file, function(data){
            config = merge(config, data);
        });
    }

    // ------------------------------------------------------------------------------------------------------------ Init

    (function init() {
        //loadConfig('./data/layouts/test_layout.json');
    })();
}
