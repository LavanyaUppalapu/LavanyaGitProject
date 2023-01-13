({
	Add : function(component, event, helper) {
            var fnumber = component.get("v.firstValue");
            var snumber = component.get("v.secondValue");
            var action = component.get("c.addition");
            action.setParams({"firstnumber":fnumber,"secondnumber":snumber});
            action.setCallback(this,function(response){
                var state = response.getState();
                //var valueFromResp = response.getReturnValue();
                if(state === "SUCCESS"){
                    component.set("v.result",response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
},
    Substract : function(component, event, helper) {
            var fnumber = component.get("v.firstValue");
            var snumber = component.get("v.secondValue");
            var action = component.get("c.subtraction");
            action.setParams({"firstnumber":fnumber,"secondnumber":snumber});
            action.setCallback(this,function(response){
                var state = response.getState();
                //var valueFromResp = response.getReturnValue();
                if(state === "SUCCESS"){
                    component.set("v.result",response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
},
    Multiply : function(component, event, helper) {
            var fnumber = component.get("v.firstValue");
            var snumber = component.get("v.secondValue");
            var action = component.get("c.multiplication");
            action.setParams({"firstnumber":fnumber,"secondnumber":snumber});
            action.setCallback(this,function(response){
                var state = response.getState();
                //var valueFromResp = response.getReturnValue();
                if(state === "SUCCESS"){
                    component.set("v.result",response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
},
    Divide : function(component, event, helper) {
            var fnumber = component.get("v.firstValue");
            var snumber = component.get("v.secondValue");
            var action = component.get("c.division");
            action.setParams({"firstnumber":fnumber,"secondnumber":snumber});
            action.setCallback(this,function(response){
                var state = response.getState();
                //var valueFromResp = response.getReturnValue();
                if(state === "SUCCESS"){
                    component.set("v.result",response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
}

})