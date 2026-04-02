@echo off
setlocal ENABLEDELAYEDEXPANSION

set "VERBOSE=0"

set "JIRA_URL=https://jira.dedalus.com"
set "XRAY_ENDPOINT=/rest/raven/1.0/import/execution"
set "JSON_PATH=%~dp0..\test-results\xray-report.json"

REM ====== Read PAT from environment ======
set "JIRA_PAT=%JIRA_PAT%"

echo Using JSON_PATH: "%JSON_PATH%"

if not exist "%JSON_PATH%" (
  echo [ERROR] File not found: "%JSON_PATH%"
  exit /b 1
)

set "RESP_FILE=%TEMP%\xray_upload_response.json"

curl -sS --fail ^
  -H "Authorization: Bearer %JIRA_PAT%" ^
  -H "Content-Type: application/json" ^
  --write-out "HTTP_STATUS=%%{http_code}" ^
  --output "%RESP_FILE%" ^
  --data-binary @"%JSON_PATH%" ^
  "%JIRA_URL%%XRAY_ENDPOINT%" >nul

echo.
echo [OK] Upload completed.
exit /b 0