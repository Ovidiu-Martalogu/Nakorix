# ==========================================
# NAKORIX - DEVICE DISCOVERY
# ==========================================

# Luam configuratia IPv4 activa
$config = Get-NetIPConfiguration |
    Where-Object {
        $_.IPv4DefaultGateway -and
        $_.IPv4Address
    } |
    Select-Object -First 1


if (-not $config) {

    Write-Error "No active IPv4 network configuration found."

    exit 1
}


# Obtinem IP-ul si prefixul
$ipAddress = $config.IPv4Address.IPAddress
$prefixLength = $config.IPv4Address.PrefixLength


# Transformam IP-ul in octeti
$ipBytes = [System.Net.IPAddress]::Parse(
    $ipAddress
).GetAddressBytes()


# Calculam masca de retea
$mask = [uint32]0

for ($i = 0; $i -lt $prefixLength; $i++) {
    $mask = $mask -bor (
        [uint32]1 -shl (31 - $i)
    )
}


# Calculam adresa retelei
$ipNumber = (
    [uint32]$ipBytes[0] -shl 24
) -bor (
    [uint32]$ipBytes[1] -shl 16
) -bor (
    [uint32]$ipBytes[2] -shl 8
) -bor (
    [uint32]$ipBytes[3]
)


$networkNumber = $ipNumber -band $mask


$networkBytes = @(
    ($networkNumber -shr 24) -band 255
    ($networkNumber -shr 16) -band 255
    ($networkNumber -shr 8) -band 255
    $networkNumber -band 255
)


$networkAddress = $networkBytes -join "."


# ==========================================
# DEVICE DISCOVERY
# ==========================================

$devices = Get-NetNeighbor -AddressFamily IPv4 |
    Where-Object {

        $_.IPAddress -and
        $_.LinkLayerAddress -and

        # Excludem multicast
        $_.IPAddress -notlike "224.*" -and
        $_.IPAddress -notlike "225.*" -and
        $_.IPAddress -notlike "226.*" -and
        $_.IPAddress -notlike "227.*" -and
        $_.IPAddress -notlike "228.*" -and
        $_.IPAddress -notlike "229.*" -and
        $_.IPAddress -notlike "230.*" -and
        $_.IPAddress -notlike "231.*" -and
        $_.IPAddress -notlike "232.*" -and
        $_.IPAddress -notlike "233.*" -and
        $_.IPAddress -notlike "234.*" -and
        $_.IPAddress -notlike "235.*" -and
        $_.IPAddress -notlike "236.*" -and
        $_.IPAddress -notlike "237.*" -and
        $_.IPAddress -notlike "238.*" -and
        $_.IPAddress -notlike "239.*" -and

        # Excludem broadcast
        $_.IPAddress -ne "255.255.255.255" -and

        $_.LinkLayerAddress -ne "00-00-00-00-00-00" -and
        $_.LinkLayerAddress -ne "FF-FF-FF-FF-FF-FF"
    }


$result = foreach ($device in $devices) {

    $hostname = ""

    try {

        $dns = Resolve-DnsName `
            -Name $device.IPAddress `
            -Type PTR `
            -ErrorAction Stop

        $hostname = $dns.NameHost

    }
    catch {

        $hostname = ""
    }


    [PSCustomObject]@{

        ip = $device.IPAddress

        mac = $device.LinkLayerAddress

        hostname = $hostname

        state = $device.State

    }
}


# Returnam doar JSON
$result | ConvertTo-Json -Compress