(function(){
    'use strict';

    angular
        .module('mtng.validator', [
            'mtng.validator.services',
            'mtng.validator.directives'
            ]);

    angular
        .module('mtng.validator.services', []);

    angular
        .module('mtng.validator.directives', []);
})();

(function(){
    'use strict';

    angular
        .module('mtng.validator.services')
        .factory('MTNGMessageProvider', messageProvider);

    function messageProvider(){
        var provider = {};
       

        provider.required = "This field is required.";
        provider.min = "This field must be greater than {0}";
        provider.max = "This field must be less than {0}";
        provider.minLength = "This field must be at least {0} character(s)";
        provider.maxLength = "This field not should be more than {0} character(s)";
        provider.email = "This field must be a valid email address";
        provider.digit = "This field must be digit";
        provider.number = "This field must be number";
        provider.pattern = "This field is not valid";
        provider.valid = "This field is valid";
        provider.notValid = "This field is not valid";

        return provider; 
    }
})();

(function(){
    'use strict';

    angular
        .module('mtng.validator.services')
        .factory('MTNGValidatorsProvider', validatorsProvider);

    //validatorsProvider.$inject = [];

    /*
     * @name validatorsProvider
     * @memberOf mtng.validator.services
     */
    function validatorsProvider(){
        function validatorsProvider(){
            var rules = {};
            this.messages = {};
            this.addRule = addRule;
            this.required = required;
            this.minLength = minLength;
            this.maxLength = maxLength;
            this.min = min;
            this.max = max;
            this.pattern = pattern;
            this.email = email;
            this.number = number;
            this.digit = digit;

            /*
             * @name addRule
             * @desc Adding a new rule to rules
             * @param {string} name Name of the rule
             * @param {value} value Value of the rule
             * @memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function addRule(name, value){
              rules[name] = value;
            } 

            /*
             * @name required
             * @desc Check the model that is filled or not
             * @param {objec} modelValue The value for validating
             * @return {Boolean} Return `true` if `modelValue` is not null else return `false`
             * @memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function required(modelValue){
                if(modelValue)
                    return true;
                else
                    return false;
            }
        
            /*
             * @name minLength
             * @desc Check minimum length of the value
             * @param {objec} modelValue The value for validating
             * @return {Boolean} Return `true` if `modelValue` is not great else return `false`
             * @memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function minLength(modelValue){
                if(!modelValue)
                    return;

                return modelValue.length >= rules.minLength;
            }
            
            /*
             * @name maxLength
             * @desc Check minimum length of the value
             * @param {objec} modelValue The value for validating
             * @return {Boolean} Return `true` if `modelValue` is not great else return `false`
             * @memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function maxLength(modelValue){
                if(!modelValue)
                    return;

                return modelValue.length <= rules.maxLength;
            }

            /*
             * @name min
             * @desc Check the model value with minimum value
             * @param {objec} modelValue  The value for validating
             * @return {Boolean} `true` if `modelValue` is not smaller than min else `fasle`
             * @memeberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function min(modelValue){
                if(!modelValue)
                    return;

                return modelValue >= rules.min;
            }

            /*
             * @name max
             * @desc Check the model value with maximum value
             * @param {objec} modelValue The value for validating
             * @return {Boolean} `true` if  `modelValue` is not greater than max value
             * @memberOf mtng.validator.serivces.MTNGValidatorsProvider
             */
            function max(modelValue){
                if(!modelValue)
                    return;

                return modelValue <= rules.max;
            }

            /*
             * @name pattern
             * @desc Check the model value with custome pattern
             * @param {object} modelValue The value for validating
             * @return {Boolean} `true` if `modelValue` pass regex expression else false
             * @memberOf mtng.validator.serivces.MTNGValidatorsProvider
             */
            function pattern(modelValue){
                if(!modelValue)
                    return;

                return rules.pattern.test(modelValue);
            }

            /*
             * @name email
             * @desc Check the model value with emial pattern
             * @param {object} modelValue The value for validating
             * @return {Boolean} `true` if `modelValue` pass pattern regex else `false`
             * @memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function email(modelValue){
                if(!modelValue)
                    return;

                var pattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
                    "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

                return pattern.test(modelValue);
            }

            /*
             * @name digit
             * @desc Check the model value that is digit or not
             * @param {object} modelValue The value for validating
             * @return {Boolean} `true` if `modelValue` is digit else `false`
             * @memberOf mtng.validator.serivces.MTNGValidatorsProvider
             */
            function digit(modelValue){
                if(!modelValue)
                    return;

                var pattern = /^\d+$/g;

                return pattern.test(modelValue);
            }

            /*
             * @name number
             * @desc Check the model value that is decimal or not
             * @param {object} modelValue The value for validating
             * @return {Boolean} `true` if `modelValue` is decimal else `false`
             * @memberOf mtng.validator.serivces.MTNGValidatorsProvider
             */
            function number(modelValue){
                if(!modelValue)
                    return;

                var pattern = /^\d+(\.\d+)?$/;

                return pattern.test(modelValue);
            }
        }

       return validatorsProvider;

    }
})();

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
                        provider.messages[key + '_failed'] = value['failedMessage'].format(value[key]);
                    else if(key in MTNGMessageProvider)
                        provider.messages[key + '_failed'] = MTNGMessageProvider[key].format(value[key]);
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
                            provider.messages[key + '_failed'] = MTNGMessageProvider[key].format(value);
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
