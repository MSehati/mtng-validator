(function(){
    'use strict';

    angular
        .module('mtng.validator.directives')
        .directive('mtngValidator', Validator);

    Validator.$inject = ['MTNGValidatorsProvider','MTNGMessageProvider'];

    /*
     * @name Validator
     * @memberOf mtng.validator.directives
     */
    function Validator(MTNGValidatorsProvider, MTNGMessageProvider){
        var Validator = {
            link: link,
            require: 'ngModel',
        };

        /*
         * @name link
         * @desc Try to add validators to the element 
         * those are defined in controller
         * @memberOf mtng.validator.directives.mtngValidator
         */
        function link(scope, element, attrs, ngModel){
            // get the controller of the element
            var ctl = element.controller();
            if (! ctl.rules){
                // There is not any rules
                return;
            }

            // get model's name that is bind to this element
            var modelName = ngModel.$name;

            if(!ctl.rules[modelName]){
                // There is not any rules for the ngModel
                return;
            }
            // get the model's rules
            var rules = ctl.rules[modelName];

            // Add errors pane after the element
            addErrorsPane(element);

            var provider = new MTNGValidatorsProvider();


            
            if(typeof(rules) === 'string'){
                if(! rules in provider)
                    // There is not any validator by this name in validators provider
                    return;
                ngModel.$validators[rules] = provider[rules];
                
                if(rules in MTNGMessageProvider)
                    provider.messages[rules + '_failed'] = MTNGMessageProvider[rules];
                else
                    provider.messages[rules + '_failed'] = MTNGMessageProvider.notValid;

                provider.messages[rules + '_success'] = MTNGMessageProvider.valid;
                
            }
            else if(typeof(rules) === 'object')
                angular.forEach(rules, forEach);

            scope.$watch(function(){ return ngModel.$viewValue;}, toggleValidationMessages);

            scope.$watch(function(){ return ngModel.$viewValue;}, function(newValue, oldValue){
                console.log(newValue + '<----' + oldValue);
            });

            /*
             * @name forEach
             * @param {string} key  Key's name
             * @param {string|object}value The value of the key
             * @memberOf mtng.validator.directives.mtngValidator
             */
            function forEach(value, key){
                if (typeof(value) === 'object'){
                    if(key in value){
                        // Adding requirement value to rules of provider
                        provider.addRule(key, value[key]);
                    }

                    if('customValidator' in value)
                        ngModel.$validators[key] = value['customValidator'];
                    else if(key in provider)
                        ngModel.$validators[key] = provider[key];

                    if('failedMessage' in value)
                        provider.messages[key + '_failed'] = value['failedMessage'];
                    else if(key in MTNGMessageProvider)
                        provider.messages[key + '_failed'] = MTNGMessageProvider[key];
                    else
                        provider.messages[key + '_failed'] = MTNGMessageProvider.notValid;

                    if('successMessage' in value)
                        provider.messages[key + '_success'] = value['successMessage'];
                    else
                        provider.messages[key + '_success'] = MTNGMessageProvider.valid;

                }
                else{
                    if(key in provider){
                        provider.addRule(key, value);
                        
                        if(key in MTNGMessageProvider)
                            provider.messages[key + '_failed'] = MTNGMessageProvider[key];
                        else
                            provider.messages[key + '_failed'] = MTNGMessageProvider.notValid;

                        provider.messages[key + '_success'] = MTNGMessageProvider.valid;
                        
                        ngModel.$validators[key] = provider[key];
                    }
                }
            }

            /*
             * @name toggleValidationMessages
             * @desc Show or remove validation messages
             * @param {string} newValue The new value of model validate
             * @param {string} oldValue The old value of model validate
             * @memberOf mtng.validator.directives.mtngValidator
             */
            function toggleValidationMessages(newValue, oldValue){
                var keys = Object.keys(ngModel.$error);
                var errorPane = angular.element('#' + ngModel.$name + '_error_pane');
                
                //Remove all last messages from error pane
                errorPane.empty();


                for (var i = 0; i < keys.length; i++){
                    if(ngModel.$error[keys[i]]){
                        if(errorPane.find('.' + keys[i]).length == 0)
                            errorPane.append('<span class="'+ keys[i] + ' bg-danger"> '+ provider.messages[keys[i] + '_failed'] + '</span>');
                    }
                }
            }

            /*
             * @name addErrorsPane
             * @desc Add a div after the element to show error messages
             * @param {object} element
             * @memberOf mtng.validator.directives.mtngValidator
             */
            function addErrorsPane(element){
                var pane = '<div id="' + ngModel.$name + '_error_pane" class="errors"></div>';

                element.after(pane);
            }
        }

        return Validator;
    }
})();
