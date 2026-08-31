$config = Get-NetIPConfiguration |
    Where-Object {
        $_.IPv4Address -and $_.IPv4DefaultGateway
    } |
    Select-Object -First 1

if ($config) {

    $dns = Get-DnsClientServerAddress `
        -InterfaceIndex $config.InterfaceIndex `
        -AddressFamily IPv4

    $adapter = Get-NetAdapter `
        -InterfaceIndex $config.InterfaceIndex

    [PSCustomObject]@{
        interface = $config.InterfaceAlias
        adapter   = $config.InterfaceDescription
        network   = $config.NetProfile.Name
        ipv4      = $config.IPv4Address.IPAddress
        gateway   = $config.IPv4DefaultGateway.NextHop
        dns       = @($dns.ServerAddresses)
        mac       = $adapter.MacAddress
        status    = $adapter.Status
    } | ConvertTo-Json -Compress
}