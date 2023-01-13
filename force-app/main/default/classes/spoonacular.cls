public class spoonacular {
    private static final string spoonacularRecipe_Endpoint = 'https://api.spoonacular.com' ;
    private static final string API_KEY = 'a1d7955f0d704f5e9c2c08057fe7d940';
    public static void getRandomRecipes(){
    Http http = new Http();
HttpRequest request = new HttpRequest();
request.setEndpoint(spoonacularRecipe_Endpoint+'/recipes/random?apiKey='+API_KEY);
request.setMethod('GET');
HttpResponse response = http.send(request);
system.debug(response.getStatusCode());
system.debug(response.getBody());
   
    }

}