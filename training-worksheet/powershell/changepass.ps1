$users = Get-ADUser -filter * -SearchBase "ou=XXXX,dc=XXXX,dc=local"
Get-RDUserSession | where { $users.sAMAccountName -contains $_.UserName } | % { $_ | Invoke-RDUserLogoff -Force }

Import-Csv 'C:\Users\{{User}}\Downloads\CSV.csv' | ConvertTo-CSV -NoTypeInformation | % { $_ -Replace '"', ""} | Out-File 'C:\Users\{{User}}\Downloads\CSV-AD.csv' -fo -en ascii

Import-Module ActiveDirectory
$Resetpassword = Import-Csv "C:\Users\{{User}}\Downloads\import\CSV-AD.csv"

# Change pass AD
foreach ($Account in $Resetpassword) {
    $Account.UsuarioTS
    $Account.SenhaTS
    Set-ADAccountPassword -Identity $Account.UsuarioTS -NewPassword (ConvertTo-SecureString $Account.SenhaTS -AsPlainText -force) -Reset
        
}

#Call script change config guacamole
powershell.exe -executionpolicy bypass  -file "C:\Users\{{User}}\Downloads\guaca.ps1"  

# Remove files in Download
Remove-Item C:\Users\{{User}}\Downloads\*.csv
Remove-Item C:\Users\{{User}}\Downloads\import\*.csv

# Restart tomcat and guacd

wsl sudo /etc/init.d/tomcat8 restart
wsl sudo /etc/init.d/guacd restart

#Show message
Start-Process C:\Users\{{User}}\Downloads\message.bat
