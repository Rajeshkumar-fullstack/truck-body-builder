Add-Type -AssemblyName System.Drawing

function Resize-And-Save($srcPath, $dstPath, $maxW, $maxH, $quality = 88) {
    if (-not (Test-Path $srcPath)) {
        Write-Error "Source path does not exist: $srcPath"
        return
    }

    $srcImg = [System.Drawing.Image]::FromFile($srcPath)
    $origW = $srcImg.Width
    $origH = $srcImg.Height

    # Calculate scale factor to fit within maxW and maxH while preserving aspect ratio
    $scale = [Math]::Min([double]$maxW / $origW, [double]$maxH / $origH)
    if ($scale -gt 1.0) { $scale = 1.0 }

    $targetW = [int]($origW * $scale)
    $targetH = [int]($origH * $scale)

    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $g.DrawImage($srcImg, $destRect, 0, 0, $origW, $origH, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $srcImg.Dispose()

    # Get JPEG encoder
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

    # Save to temp file first to prevent lock conflicts
    $tmpDst = $dstPath + ".tmp.jpg"
    $bmp.Save($tmpDst, $codec, $encoderParams)
    $bmp.Dispose()

    Move-Item -Path $tmpDst -Destination $dstPath -Force
    $sz = (Get-Item $dstPath).Length
    Write-Host "Optimized $dstPath -> ${targetW}x${targetH} ($([Math]::Round($sz / 1024, 1)) KB)"
}

$images = @(
    @{ Src = "scratch\candidates\open_isuzu.jpg"; Dst = "assets\images\products\open-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\container_msc.jpg"; Dst = "assets\images\products\container-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\tipper_arocs.jpg"; Dst = "assets\images\products\tipper-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\trailer_lowbed.jpg"; Dst = "assets\images\products\trailer-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\tanker_scania.jpg"; Dst = "assets\images\products\tanker-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\reefer_scania.jpg"; Dst = "assets\images\products\reefer-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\flatbed_innovia.jpg"; Dst = "assets\images\products\flatbed-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\custom_wrecker.jpg"; Dst = "assets\images\products\custom-body.jpg"; MaxW = 1200; MaxH = 900 },
    @{ Src = "scratch\candidates\facility_mercedes.jpg"; Dst = "assets\images\about\facility-1.jpg"; MaxW = 1200; MaxH = 900 }
)

foreach ($item in $images) {
    Resize-And-Save -srcPath $item.Src -dstPath $item.Dst -maxW $item.MaxW -maxH $item.MaxH
}
