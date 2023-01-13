({
	handleChange : function(component, event, helper) {
        var CompEvent = component.getEvent("msgEvent");
        CompEvent.setParams({"selectedval":component.get("v.selOption")});
        CompEvent.fire();
		
	}
})