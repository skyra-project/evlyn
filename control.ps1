Function Step-Main {
    Param (
        [string]$Command = "default"
    )

    Process {
        switch ( $Command ) {
            login {
                $Username = $( Read-Host "Please provide your GitHub username" )
                $SecurePassword = $( Read-Host -AsSecureString "Please provide a GitHub token with access to publish packages" )
                ConvertFrom-SecureString -SecureString $SecurePassword | docker login https://docker.pkg.github.com -u $Username --password-stdin
            }
            build { yarn clean && yarn build && docker build -t skyrabot/evlyn:main . }
            run { docker container run -it skyrabot/evlyn:main /bin/sh }
            deploy { docker push skyrabot/evlyn:main }
            removeimage { docker rmi -f skyrabot/evlyn:main }
			remove { docker-compose -p evlyn -f "$($PSScriptRoot)/scripts/docker-compose.yml" rm -fsv $Service }
			start { docker-compose -p evlyn -f "$($PSScriptRoot)/scripts/docker-compose.yml" up -d $Service }
			logs { docker-compose -p evlyn -f "$($PSScriptRoot)/scripts/docker-compose.yml" logs $Service }
			tail { docker-compose -p evlyn -f "$($PSScriptRoot)/scripts/docker-compose.yml" logs -f $Service }
            default { Write-Host "Unrecognized command, please try again" -ForegroundColor Red }
        }
    }
}

Step-Main @args