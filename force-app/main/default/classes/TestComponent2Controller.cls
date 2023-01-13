public class TestComponent2Controller {
@AuraEnabled
    public static decimal getAdditionResult(decimal fstNumber,decimal secNumber){
       return(fstNumber + secNumber);
    }    
}