adb reverse tcp:3000 tcp:3000
adb reverse tcp:8081 tcp:8081
Write-Host "ADB reverse done!" -ForegroundColor Green
cd mobile
npm run start:device
