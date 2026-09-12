# Fix all non-ASCII characters in admin/ai tsx/ts files that break Turbopack
$basePath = "src\app\admin\ai"
$files = Get-ChildItem -Recurse -Include *.tsx,*.ts -Path $basePath

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content

    # Replace em-dashes with regular dashes
    $content = $content -replace [char]0x2014, '-'
    $content = $content -replace [char]0x2013, '-'

    # Replace curly single quotes with straight quotes
    $content = $content -replace [char]0x2018, "'"
    $content = $content -replace [char]0x2019, "'"

    # Replace curly double quotes with straight quotes  
    $content = $content -replace [char]0x201C, '"'
    $content = $content -replace [char]0x201D, '"'

    # Replace ellipsis character with three dots
    $content = $content -replace [char]0x2026, '...'

    # Replace non-breaking space with regular space
    $content = $content -replace [char]0x00A0, ' '

    # Fix wrong relative import paths for AdminEditors
    # insights/new/page.tsx and insights/[id]/edit/page.tsx use ../../components/AdminEditors
    # but the correct path from those locations is different
    $content = $content -replace "from '../../components/AdminEditors'", "from '@/app/admin/ai/components/AdminEditors'"
    $content = $content -replace "from ""../../components/AdminEditors""", "from ""@/app/admin/ai/components/AdminEditors"""

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "`nDone. Verifying no non-ASCII remains..."

# Verify
$remaining = 0
foreach ($file in (Get-ChildItem -Recurse -Include *.tsx,*.ts -Path $basePath)) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    foreach ($b in $bytes) {
        if ($b -gt 127) {
            Write-Host "STILL HAS NON-ASCII: $($file.FullName)"
            $remaining++
            break
        }
    }
}

if ($remaining -eq 0) {
    Write-Host "All files are clean ASCII!"
} else {
    Write-Host "$remaining files still have non-ASCII characters"
}
