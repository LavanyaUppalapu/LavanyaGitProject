@isTest
private class caseCreationAPIClsTest {
    private static testMethod void createcase(){
       case caseObj = new case();
       caseObj.origin = 'web';
       caseObj.Subject = 'API Case creation';
       caseObj.Status = 'New';
        Test.startTest();
        insert caseObj;
        Test.stopTest();
        system.assert(caseObj.Id != null);
    }

}