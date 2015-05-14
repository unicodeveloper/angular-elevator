(function(window, angular, undefined){

  var app = angular.module('ngElevator', []);

  app.directive('elevator', function(){
    return {
        restrict: 'EA',
        template:'<div class="elevator">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px">' +
                        '<path d="M70,47.5H30c-1.4,0-2.5,1.1-2.5,2.5v40c0,1.4,1.1,2.5,2.5,2.5h40c1.4,0,2.5-1.1,2.5-2.5V50C72.5,48.6,71.4,47.5,70,47.5z   M47.5,87.5h-5v-25h5V87.5z M57.5,87.5h-5v-25h5V87.5z M67.5,87.5h-5V60c0-1.4-1.1-2.5-2.5-2.5H40c-1.4,0-2.5,1.1-2.5,2.5v27.5h-5  v-35h35V87.5z"/>' +
                        '<path d="M50,42.5c1.4,0,2.5-1.1,2.5-2.5V16l5.7,5.7c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7c1-1,1-2.6,0-3.5l-10-10  c-1-1-2.6-1-3.5,0l-10,10c-1,1-1,2.6,0,3.5c1,1,2.6,1,3.5,0l5.7-5.7v24C47.5,41.4,48.6,42.5,50,42.5z"/>' +
                    '</svg>' +
                    'Back to Top' +
                '</div>',
        replace: true,
        link: function(scope, elem, attr){
          var Elevator = (function() {
                // Elements
                var body       = null,
                // Scroll vars
                animation      = null,
                duration       = null,
                customDuration = false,
                startTime      = null,
                startPosition  = null,

                mainAudio,
                endAudio,

                elevating      = false;

                /**
                 * Utils
                 */
                // Soft object augmentation
                function extend( target, source ) {
                    for (var key in source) {
                        if ( !(key in target) ) {
                            target[ key ] = source[ key ];
                        }
                    }
                    return target;
                };

                // Thanks Mr Penner - http://robertpenner.com/easing/
                function easeInOutQuad( t, b, c, d ) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                };

                // Time is passed through requestAnimationFrame, what a world!
                function animateLoop( time ) {
                    if (!startTime) {
                        startTime = time;
                    }

                    var timeSoFar = time - startTime;
                    var easedPosition = easeInOutQuad(timeSoFar, startPosition, -startPosition, duration);

                    window.scrollTo(0, easedPosition);

                    if( timeSoFar < duration ) {
                        animation = requestAnimationFrame(animateLoop);
                    } else {
                        animationFinished();
                    }
                };

                function elevate() {
                    if(elevating) {
                        return;
                    }

                    elevating = true;
                    startPosition = (document.documentElement.scrollTop || body.scrollTop);

                    // No custom duration set, so we travel at pixels per millisecond. (0.75px per ms)
                    if(!customDuration) {
                        duration = (startPosition * 1.5);
                    }

                    requestAnimationFrame( animateLoop );

                    // Start music!
                    if(mainAudio) {
                        mainAudio.play();
                    }
                };

                function resetPositions() {
                    startTime = null;
                    startPosition = null;
                    elevating = false;
                };

                function animationFinished() {
                    resetPositions();
                    // Stop music!
                    if(mainAudio) {
                        mainAudio.pause();
                        mainAudio.currentTime = 0;
                    }

                    if(endAudio) {
                        endAudio.play();
                    }
                };

                function onWindowBlur() {
                    // If animating, go straight to the top. And play no more music.
                    if(elevating) {
                        cancelAnimationFrame( animation );
                        resetPositions();

                        if(mainAudio) {
                            mainAudio.pause();
                            mainAudio.currentTime = 0;
                        }
                        window.scrollTo(0, 0);
                    }
                };

                //@TODO: Does this need tap bindings too?
                function bindElevateToElement( element ) {
                    element.addEventListener('click', elevate, false);
                };

                function main( options ) {
                    // Bind to element click event, if need be.
                    body = document.body;

                    if(options.element) {
                        bindElevateToElement( options.element );
                    }

                    if(options.duration) {
                        customDuration = true;
                        duration = options.duration;
                    }

                    if(options.mainAudio) {
                        mainAudio = new Audio( options.mainAudio );
                        mainAudio.setAttribute( 'preload', 'true' ); //@TODO: Option to not preload audio.
                        mainAudio.setAttribute( 'loop', 'true' );
                    }

                    if(options.endAudio) {
                        endAudio = new Audio( options.endAudio );
                        endAudio.setAttribute( 'preload', 'true' );
                    }

                    window.addEventListener('blur', onWindowBlur, false);
                };
                return extend(main, {
                    elevate: elevate
                });
            })();

            window.onload = function(){
              var elevator = new Elevator({
                element: document.querySelector('.elevator'),
                mainAudio: '../music/elevator-music.mp3',
                endAudio: '../music/ding.mp3'
              });
            }
        }
    }
  });
})(window, window.angular);