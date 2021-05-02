
function onOpen() {
  SpreadsheetApp.getUi()
                .createMenu('Treinamento')
                .addItem('Topico', 'openSidebar')
                .addToUi();
}

function openSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("index").setTitle("Treinamento");
  SpreadsheetApp.getUi().showSidebar(html);
}

function createDataUrl(type) {

  var result = SpreadsheetApp.getUi().alert("Tem certeza que deseja realizar o download da lista e aplicar as senhas?", SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
  if(result === SpreadsheetApp.getUi().Button.OK) {

  const mimeTypes = { csv: MimeType.MICROSOFT_EXCEL, pdf: MimeType.PDF };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  let url = null;
  if (type == "csv") {
    url = `https://docs.google.com/spreadsheets/d/${ss.getId()}/gviz/tq?tqx=out:csv&gid=${sheet.getSheetId()}`;
  } else if (type == "pdf") {
    url = `https://docs.google.com/spreadsheets/d/${ss.getId()}/export?format=pdf&gid=${sheet.getSheetId()}`;
  }
  if (url) {
    const blob = UrlFetchApp.fetch(url, {
      headers: { authorization: `Bearer ${ScriptApp.getOAuthToken()}` },
    }).getBlob();
    return {
      data:
        `data:${mimeTypes[type]};base64,` +
        Utilities.base64Encode(blob.getBytes()),
      filename: `${sheet.getSheetName()}.${type}`,
    };
  }
  return { data: null, filename: null };

  } else {
    SpreadsheetApp.getActive().toast("Ação cancelada!");
  }

}

function reset() {

  var result = SpreadsheetApp.getUi().alert("Tem certeza que deseja alterar?", SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);
  if(result === SpreadsheetApp.getUi().Button.OK) {

       var sheet = SpreadsheetApp.getActiveSheet();
       var cpfs = sheet.getRange("B2:B21").setValue("10293847560").setNumberFormat("@");

    SpreadsheetApp.getActive().toast("Alteração realizada com sucesso!");
  } else {
    SpreadsheetApp.getActive().toast("Ação cancelada!");
  }
  
 
 }





