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
        provider.ip = "Please Enter a valid IP adress.";

        return provider; 
    }
})();
