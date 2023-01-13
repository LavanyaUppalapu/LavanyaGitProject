@RestResource(urlMapping = '/casemanagement/v1/*')
global with sharing class caseCreationAPICls{
 @HttpPost
global static void createcase(){
RestRequest request = Restcontext.request;
string jsonBody = Request.RequestBody.toString();
RestResponse response = Restcontext.response;

caseJsonParser ParserObj = (caseJsonParser) System.Json.deserialize(jsonBody, caseJsonParser.class);
if(ParserObj != null && ParserObj.CaseDetails != null){
    System.debug(ParserObj);
case caseObj = new case();
caseObj.origin = ParserObj.CaseDetails.origin;
caseObj.Subject = 'API Case creation';
caseObj.Status = 'New';
insert CaseObj;

}
}
}