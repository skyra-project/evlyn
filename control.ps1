Function Step-Main {
    Param (
        [string]$Command = "default"
    )

    Process {
        switch ( $Command ) {
            build { yarn clean && yarn build && docker build -t evlyn:latest . }
            run { docker container run -it evlyn:latest /bin/sh }
            remove { docker rmi -f evlyn:latest }
            default { Write-Host "Unrecognized command, please try again" -ForegroundColor Red }
        }
    }
}

Step-Main @args