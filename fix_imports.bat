@echo off
echo Fixing import paths...
for /r %%f in (*.go) do (
    powershell -Command "(Get-Content '%%f') -replace 'nutrition-platform/', 'doctorhealthy1/' | Set-Content '%%f'"
)
echo Done!
