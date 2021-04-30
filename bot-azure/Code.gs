/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onMessage(event) {
 console.info(event);
  
  var name = "";
  var names = "";
  
  if (event.space.type == "DM") {
    var name = event.user.displayName + " abriu -> ";
    var room       = "AzureCard InfraTI";    
    
  } else {
    name = event.user.displayName + " abriu -> ";
    names = event.user.displayName; 
    var room       = event.space.displayName;
    
  }
   
  var message    = event.message.text;
  var sender     = event.message.sender.displayName;
  var sendermail = event.message.sender.email;

  var payload = (
       [ { "op":"add", "path":"/fields/System.Title", "value": message } ]
  );
 
 var myPAT ="token";
 var base64Pat = Utilities.base64Encode(":"+myPAT);
 var b = "Basic " + base64Pat;
 
 var headers = {
        "Authorization": b
    };
 
url = "https://dev.azure.com/{{ORG}}/{{Project}}/_apis/wit/workitems/\$User%20Story?api-version=6.0";
var link = "https://dev.azure.com/{{ORG}}/{{Project}}/_backlogs/backlog/{{Project}}%20Team/Stories";

var response = UrlFetchApp.fetch(
            url,
            {
              method: "post",
              contentType: "application/json-patch+json; charset=utf-8",
              payload: JSON.stringify(payload),
              headers: headers,
            }
          );
          
  if (response.getResponseCode() == 200) {        
      var resp = "Card de " + sender + " foi gerado na =>Azure InfraTI<= com sucesso.:\nAcesse o Backlog InfraTI: " + link;
      return { "text": resp };
   }else{
        var resp = "Houve um problema na geração do card de " + sender + " na =>Azure InfraTI<=\nConsulte os logs para maiores deltalhes";
        return { "text": resp };
   }
}


/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onAddToSpace(event) {
   console.info(event);
  var message = "";
  
  if (event.space.type == "DM") {
    message = "AzureCard InfraTI adicionado DM, " + event.user.displayName + "!";
  } else {
    message = "AzureCard InfraTI adicionado para " + event.space.displayName;
  }
  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  console.info("AzureCard InfraTI removido ", event.space.name);
}


