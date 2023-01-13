public class AuraApex {
    @AuraEnabled
    public static decimal addition(decimal firstnumber,decimal secondnumber){
        decimal sum= firstnumber + secondnumber;
        return sum;
    }
    @AuraEnabled
    public static decimal subtraction(decimal firstnumber,decimal secondnumber){
        decimal sub= firstnumber - secondnumber;
        return sub;
    }
    @AuraEnabled
    public static decimal multiplication(decimal firstnumber,decimal secondnumber){
        decimal mul= firstnumber * secondnumber;
        return mul;
    }
    @AuraEnabled
    public static decimal division(decimal firstnumber,decimal secondnumber){
        decimal div= firstnumber / secondnumber;
        return div;
    }
}