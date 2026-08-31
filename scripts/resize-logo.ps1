Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "..\assets\images\evertap-logo.jpeg"
$backupPath = Join-Path $PSScriptRoot "..\assets\images\evertap-logo.backup.jpeg"
$tempPath = Join-Path $PSScriptRoot "..\assets\images\evertap-logo.temp.jpeg"

if (-not (Test-Path $backupPath)) {
    Copy-Item $srcPath $backupPath
}

$img = [System.Drawing.Image]::FromFile($srcPath)
Write-Host "Original dimensions: $($img.Width)x$($img.Height)"

$targetSize = 512
$newImg = New-Object System.Drawing.Bitmap($targetSize, $targetSize)
$graphics = [System.Drawing.Graphics]::FromImage($newImg)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$graphics.DrawImage($img, 0, 0, $targetSize, $targetSize)

$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$newImg.Save($tempPath, $encoder, $encoderParams)

$graphics.Dispose()
$newImg.Dispose()
$img.Dispose()

Move-Item -Force $tempPath $srcPath
$finalSize = (Get-Item $srcPath).Length
Write-Host "Resized logo saved. New size: $finalSize bytes"
