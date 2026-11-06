Add-Type -AssemblyName System.Drawing

$src = "scratch/unimog_assembly.jpg"
$dest = "assets/images/about/facility-1.jpg"

$rawBytes = [System.IO.File]::ReadAllBytes($src)
$ms = New-Object System.IO.MemoryStream($rawBytes, $false)
$origImg = [System.Drawing.Image]::FromStream($ms)

$maxWidth = 1200
$maxHeight = 900
$origW = $origImg.Width
$origH = $origImg.Height
$ratio = [Math]::Min([double]$maxWidth / $origW, [double]$maxHeight / $origH)
if ($ratio -gt 1.0) { $ratio = 1.0 }
$newW = [int]($origW * $ratio)
$newH = [int]($origH * $ratio)

$bmp = New-Object System.Drawing.Bitmap($newW, $newH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$destRect = New-Object System.Drawing.Rectangle(0, 0, $newW, $newH)
$g.DrawImage($origImg, $destRect, 0, 0, $origW, $origH, [System.Drawing.GraphicsUnit]::Pixel)

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)

$bmp.Save($dest, $jpegCodec, $encoderParams)

$g.Dispose()
$bmp.Dispose()
$origImg.Dispose()
$ms.Dispose()

$finalSize = (Get-Item $dest).Length / 1KB
Write-Host "Optimized facility-1.jpg -> $newW x $newH ($([Math]::Round($finalSize, 1)) KB)"
