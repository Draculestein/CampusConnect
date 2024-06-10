{ pkgs, lib, config, inputs, ... }:

{
  cachix.enable = false;
  dotenv.enable = true;

  # https://devenv.sh/packages/
  packages = with pkgs; [ 
    git
    sqlite
  ];

  # https://devenv.sh/scripts/
  scripts.hello.exec = "echo 'CampusConnect Dev Shell'";
  scripts.compu.exec = "docker compose up -d";
  scripts.compd.exec = "docker compose down";

  enterShell = ''
    hello
  '';

  languages.javascript = {
    enable = true;
    npm.enable = true;
    npm.install.enable = true;
  };

  languages.typescript.enable = true;

  # https://devenv.sh/tests/
  # enterTest = ''
  #   echo "Running tests"
  #   git --version | grep "2.44.0"
  # '';

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/languages/
  # languages.nix.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
}
