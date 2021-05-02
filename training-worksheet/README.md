# 📋 infratidev
### Training worksheet
#### Criar um ambiente atraves de uma planilha do google, onde o instrutor com base nas informações de algumas colunas, ao clicar em um botão, instanciar alguns scripts para realizar as trocas de senhas das turmas vinculdas ao Active Directory, para posterior conexão ao terminal service via aplicativo do windows "conexão de area de trabalho remota" ou através de um gateway de ts clientless"

#### Primeira etapa
- Projeto foi criar uma planilha no google, com algumas colunas. Através de um menu instanciar um html com um botão, que ao acionado fará o download de algumas colunas no formato CSV.
- Dentro do Sistema Operacional, está rodando um processo em background, que irá identificar quando o arquivo .csv estiver dentro da pasta e disparar uma ação.
- Essa ação, irá chamar um script para com bases nas informações do .csv, realizar as trocas de senhas nos usuarios do AD, já pré-definidos e acionar outros scripts.
- Toda parte dos serviços de RDS já estão configurados no ambiente

** googlescript diretorio **

#### Segunda etapa
- Através de um subsystem Linux dentro do ambiente, com o gateway de ts instalado, ao clicar no botão de download, fazer a ação da primeira etapa, e inserir os registros de usuario e senha no arquivo de configuração do gateway de ts, no caso, guacamole

** powershell diretorio **
