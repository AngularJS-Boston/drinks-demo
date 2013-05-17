/*
* Directives
*/

'use strict';

var directives = angular.module('app.directives',[]);

// directives.directive('formValidate', function() {
//     return {
//         require: 'ngModel',
//         link: function( scope, elm, attrs, ctrl ) {
//             ctrl.$parsers.unshift( function( viewValue ) {
//                 scope.NameLength = (viewValue && viewValue.length > 2 ? 'valid' : undefined );

//                 if(scope.nameLength) {
//                     ctrl.$setValidity('name', true);
//                     return viewValue;
//                 } else {
//                     ctrl.$setValidity('name', false);
//                     return undefined;
//                 }
//             });
//         }
//     };
// });