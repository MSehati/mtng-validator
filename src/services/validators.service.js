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
            this.ip = ip;

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
                    return true;

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
                    return true;

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
                    return true;

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
                    return true;

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
                    return true;

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
                    return true;

                var pattern = /^\d+(\.\d+)?$/;

                return pattern.test(modelValue);
            }

            /*
             * @name ip
             * @desc Chech the model value that is valid ip or not
             * @param {object{ modelValue The value fot validating
             * @return {Boolean} 'true' if 'modelValue' is a valid ip address else 'false'
             * memberOf mtng.validator.services.MTNGValidatorsProvider
             */
            function ip(modelValue){
                if(!modelValue)
                    return true;

                var pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

                return pattern.test(modelValue);
            }
        }

       return validatorsProvider;

    }
})();
