Add-Type -AssemblyName System.Drawing

$resolvedJson = Get-Content "scratch/resolved_urls.json" | ConvertFrom-Json
$tempDir = "scratch/temp_raw"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)

$props = $resolvedJson | Get-Member -MemberType NoteProperty

foreach ($prop in $props) {
    $targetRel = $prop.Name
    $safeName = $targetRel -replace '[\/\\]', '__'
    $rawPath = Join-Path $tempDir $safeName
    $outPath = Join-Path "assets/images" $targetRel

    if (-not (Test-Path $rawPath)) {
        Write-Warning "Missing raw file: $rawPath"
        continue
    }

    $rawBytes = [System.IO.File]::ReadAllBytes($rawPath)
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

    # Ensure target parent dir exists
    $parentDir = Split-Path $outPath -Parent
    if (-not (Test-Path $parentDir)) {
        New-Item -ItemType Directory -Force -Path $parentDir | Out-Null
    }

    # Save to disk
    $bmp.Save($outPath, $jpegCodec, $encoderParams)

    $g.Dispose()
    $bmp.Dispose()
    $origImg.Dispose()
    $ms.Dispose()

    $finalSize = (Get-Item $outPath).Length / 1KB
    Write-Host "[RESIZED & OPTIMIZED] $targetRel -> $newW x $newH ($([Math]::Round($finalSize, 1)) KB)"
}

Write-Host "All images successfully processed!"
