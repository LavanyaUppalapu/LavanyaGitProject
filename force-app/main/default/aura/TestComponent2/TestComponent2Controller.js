({
	addition : function(component, event, helper) {
		    var firstNumber = parseInt(component.get("v.fnumber"));
            var secondNumber = parseInt(component.get("v.snumber"));
            var action = component.get("c.getAdditionResult");
            action.setParams({"fstNumber":firstNumber,"secNumber":secondNumber});
            action.setCallback(this,function(response){
                var addResult = response.getReturnValue();
                alert(addResult);
                    component.set("v.result",addResult);
                
            });
            $A.enqueueAction(action);
	}
})