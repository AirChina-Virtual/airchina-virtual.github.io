@echo off

for %%F in (*.mp4) do (
    ffmpeg -i "%%F" -c:v libvpx -crf 20 -b:v 1M -an "%%~nF.webm"
)

pause