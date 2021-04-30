/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */

var DEFAULT_IMAGE_URL = 'url image';
var HEADER = {
  header: {
    title : 'Qual o STATUS da notificação ?',
    subtitle : 'Informe o Status',
    imageUrl : DEFAULT_IMAGE_URL,
    "imageStyle": "IMAGE"
  }
};

function createCardResponse(widgets,update) {
  return {
  "actionResponse": { "type": update ? "UPDATE_MESSAGE" : "NEW_MESSAGE" },
    cards: [HEADER, {
      sections: [{
        widgets: widgets
      }]
    }]
  }
}


function onMessage(event) {
 console.info(event);
  
  var message    = event.message.text;
  var sender     = event.message.sender.displayName;
  var sendermail = event.message.sender.email;
  
  if (event.space.type == "DM") {
      var name = event.user.displayName;
      var room       = "INFO-News";    
    
  } else {
      var name = event.user.displayName;
      var room       = event.space.displayName;
    
  }
  
    var widgets = [{
 
        textParagraph: {
            text: 'Olá, <b>' + name + '</b>.<br/>Qual o <font color=\"#0000ff\">Status</font> da notificação abaixo:<br><br>'  + message + '<br><br><a target=\"_blank\" href=\"link RSS criado">Link RSSInfraTI</a><br><br>'
        },
       buttons: [{
      textButton: {
        text: 'PROBLEMA',
        onClick: {
          action: {
            actionMethodName: 'PROBLEMA',
            parameters: [{
              key: 'status',
              value: 'Problema',
            },
            {
              key: 'message',
              value: message
            },
            {
              key: 'sender',
              value: sender
            },
            {
              key: 'sendermail',
              value: sendermail
            }]
          }
        }
      }
    }, {
      textButton: {
        text: 'RESOLVIDO',
        onClick: {
          action: {
            actionMethodName: 'RESOLVIDO',
            parameters: [{
              key: 'status',
              value: 'Resolvido'
            },
            {
              key: 'message',
              value: message
            },
            {
              key: 'sender',
              value: sender
            },
            {
              key: 'sendermail',
              value: sendermail
            }]
          }
        }
      }
  },{
      textButton: {
        text: 'INFORM',
        onClick: {
          action: {
            actionMethodName: 'INFORMACAO',
            parameters: [{
              key: 'status',
              value: 'Informação'
            },
            {
              key: 'message',
              value: message
            },
            {
              key: 'sender',
              value: sender
            },
            {
              key: 'sendermail',
              value: sendermail
            }]
          }
        }
      }
    }]
  }];
  
  if (event.space.type == "DM") {
        return createCardResponse(widgets,false);
  }else if (event.space.type == "CARD_CLICKED") {
        return createCardResponse(widgets,true);
  }
}


  function onCardClick(event) {
  console.info(event);
  var message = "";
  var status = event.action.parameters[0].value;
  var message = event.action.parameters[1].value;
  var sender = event.action.parameters[2].value;
  var sendermail = event.action.parameters[3].value;
  var currentTime = (new Date()).getTime();

  if (event.action.actionMethodName == 'PROBLEMA') {    
        var message =  'Problema: ' +  message.toUpperCase();
        PROBLEMA(message,sender,sendermail,status);
        
  } else if (event.action.actionMethodName == 'RESOLVIDO') {    
        message =  'Resolvido: ' +  message.toUpperCase();        
        RESOLVIDO(message,sender,sendermail,status);   
       
  } else if (event.action.actionMethodName == 'INFORMACAO') { 
        message =  'Informação: ' +  message.toUpperCase();
        INFORMACAO(message,sender,sendermail,status); 
         
  } else {
        message = "Desculpa, não entendi a solicitação";
         
  }
  
 var resp = 'Mensagem enviada com sucesso ao RSSInfraTI';
 return { text: resp }
 
}
  
  function PROBLEMA(message,sender,sendermail,status) {
  var room       = "INFO-News";
  MailApp.sendEmail("email@email", room + " - " + status, message);    
}
  
  function RESOLVIDO(message,sender,sendermail,status) {
  var room       = "INFO-News";
  MailApp.sendEmail("email@email", room + " - " + status, message);   
}
   
  function INFORMACAO(message,sender,sendermail,status) {
  var room       = "INFO-News";
  MailApp.sendEmail("email@email", room + " - " + status, message);
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
    message = "InfraTINEWS adicionado DM, " + event.user.displayName + "!";
  } else {
    message = "InfraTINEWS adicionado para " + event.space.displayName;
  }
  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  console.info("InfraTINEWS removido ", event.space.name);
}



 
