(function() {
    function seekBar($document) { // DOM object $document is added here to be used in the trackThumb function

        /**
         * @function calculatePercent
         * @desc Calculates the horizontal percent (from left to right) along the seek bar where the event (passed in from the view as $event) occurred.
         * @param {Object} seekBar
         */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                /**
                 * @desc Holds the value of the seek bar, such as the currently playing song time or the current volume (default value is 0)
                 */
                scope.value = 0;

                /**
                 * @desc Holds the maximum value of the song and volume seek bars (default value is 100)
                 */
                scope.max = 100;

                /**
                 * @desc Holds the element that matches the directive (<seek-bar>) as a jQuery object so that jQuery methods can be called on it
                 * @type {Object}
                 */
                var seekBar = $(element);

                /**
                 * @desc Updates the value of scope.value from the default value (0) to the current value
                 */
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });

                /**
                 * @desc Updates the value of scope.max from the default value (100) to the current value
                 */
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });

                /**
                 * @function percentString
                 * @desc Calculates a percent based on the value (from the left) and maximum value (to the right) of the seek bar
                 */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };

                /**
                 * @function fillStyle
                 * @desc Returns the width of the seek bar fill element based on the calculated percent
                 */
                scope.fillStyle = function() {
                    return {
                        width: percentString()
                    };
                };

                /**
                 * @function thumbStyle
                 * @desc Returns the placement of the seek bar thumb based on the calculated percent
                 */
                scope.thumbStyle = function() {
                    return {
                        left: percentString()
                    };
                };

                /**
                 * @function onClickSeekBar
                 * @desc Updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar
                 */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };

                /**
                 * @function trackThumb
                 * @desc Similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of  scope.value as the user drags the seek bar thumb
                 */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };

                /**
                 * @function notifyOnChange
                 * @desc Sends the updated value of scope.value to the seek bar so that OnChange will update with the same value (see <seek-bar on-change>)
                 */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({
                            value: newValue
                        });
                    }
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
