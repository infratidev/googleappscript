
/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onMessage(event) {
 console.info(event);
  
  var name = "";
  var names = "";
  var message    = event.message.text;
  var sender     = event.message.sender.displayName;
  var sendermail = event.message.sender.email;
  
  
  if (event.space.type == "DM") {
    var name = event.user.displayName + " abriu -> ";
    var room       = "DirectInfraTI";
    var resp = "Olá " + sender + ", chamado via direct message foi desativado. Utilize o bot @infrati na Sala. Obrigado";
    MailApp.sendEmail(sendermail,"Chamado via Direct Message para InfraTI Desativado",resp);
     
    
  } else {
    name = event.user.displayName + " abriu -> ";
    names = event.user.displayName; 
    var room       = event.space.displayName;
    MailApp.sendEmail("email@email", room + " - " + name  + "  um chamado para @infrati via Google Chat", message);
    var resp = "Chamado de " + sender + " foi solicitado para equipe de =>InfraTI<= com sucesso. Em análise...";
    
  }
  
  return { "text": resp };
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
    message = "InfraTI adicionado DM, " + event.user.displayName + "!";
  } else {
    message = "InfraTI adicionado para " + event.space.displayName;
  }
  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  console.info("InfraTI removido ", event.space.name);
}

