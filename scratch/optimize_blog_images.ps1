Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param (
        [string]$sourcePath,
        [string]$targetPath,
        [int]$maxWidth = 1200,
        [int]$maxHeight = 800,
        [long]$quality = 88
    )

    if (-not (Test-Path $sourcePath)) {
        Write-Error "Source not found: $sourcePath"
        return
    }

    $srcImage = [System.Drawing.Image]::FromFile($sourcePath)

    # Calculate optimal crop or fit for landscape 3:2 (1200x800)
    $targetAspect = [double]$maxWidth / [double]$maxHeight
    $srcAspect = [double]$srcImage.Width / [double]$srcImage.Height

    $cropWidth = $srcImage.Width
    $cropHeight = $srcImage.Height
    $cropX = 0
    $cropY = 0

    if ($srcAspect -gt $targetAspect) {
        # Source is wider, crop horizontal sides
        $cropWidth = [int]($srcImage.Height * $targetAspect)
        $cropX = [int](($srcImage.Width - $cropWidth) / 2)
    } elseif ($srcAspect -lt $targetAspect) {
        # Source is taller, crop top/bottom
        $cropHeight = [int]($srcImage.Width / $targetAspect)
        $cropY = [int](($srcImage.Height - $cropHeight) / 2)
    }

    $destBitmap = New-Object System.Drawing.Bitmap($maxWidth, $maxHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $maxWidth, $maxHeight)
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)

    $graphics.DrawImage($srcImage, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)

    $destBitmap.Save($targetPath, $jpegCodec, $encoderParams)

    $graphics.Dispose()
    $destBitmap.Dispose()
    $srcImage.Dispose()

    Write-Host "Successfully optimized $targetPath ($( (Get-Item $targetPath).Length ) bytes)"
}

$artDir = "C:\Users\rajeshkumar.s\.gemini\antigravity\brain\41ffd321-0c5a-47cd-9b93-18e62af5caa5"

# 1. Blog 1: High-Tensile Hardox Mining Tipper
Optimize-Image -sourcePath "$artDir\wiki-tipper-quarry.jpg" -targetPath "assets\images\blog\blog-1.jpg" -maxWidth 1200 -maxHeight 800 -quality 88

# 2. Blog 2: ARAI AIS-093 Commercial Truck Compliance / Tilt & Stability Testing
Optimize-Image -sourcePath "$artDir\cand-tilttest.jpg" -targetPath "assets\images\blog\blog-2.jpg" -maxWidth 1200 -maxHeight 800 -quality 88

# 3. Blog 3: Aerodynamic Dry Freight Container Semi-Trailer Truck
Optimize-Image -sourcePath "$artDir\cand-blog3-containertruck.jpg" -targetPath "assets\images\blog\blog-3.jpg" -maxWidth 1200 -maxHeight 800 -quality 88

Write-Host "All 3 blog images optimized and replaced successfully!"
