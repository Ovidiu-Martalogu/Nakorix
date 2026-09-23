$connections = Get-NetTCPConnection |
    Select-Object `
        LocalAddress,
        LocalPort,
        RemoteAddress,
        RemotePort,
        State,
        OwningProcess

$connections | ForEach-Object {

    $processName = "Unknown"

    try {
        $process = Get-Process -Id $_.OwningProcess -ErrorAction Stop
        $processName = $process.ProcessName
    }
    catch {
        $processName = "Unknown"
    }

    [PSCustomObject]@{
        LocalAddress  = $_.LocalAddress
        LocalPort     = $_.LocalPort
        RemoteAddress = $_.RemoteAddress
        RemotePort    = $_.RemotePort
        State         = $_.State.ToString()
        OwningProcess = $_.OwningProcess
        ProcessName   = $processName
    }

} | ConvertTo-Json -Depth 3