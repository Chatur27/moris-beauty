param(
  [Parameter(Mandatory = $true)]
  [string]$GitHubUsername,

  [string]$RepositoryName = "moris-beauty-3d-storefront",

  [switch]$CreateWithGitHubCli
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path "package.json")) {
  throw "Run this script from the repository root."
}

Write-Host "[1/6] Installing locked dependencies"
npm ci

Write-Host "[2/6] Running TypeScript checks"
npm run typecheck

Write-Host "[3/6] Running ESLint"
npm run lint

Write-Host "[4/6] Building the production application"
npm run build

Write-Host "[5/6] Preparing Git"
if (-not (Test-Path ".git")) {
  git init
}

git add .
$stagedChanges = git diff --cached --name-only
if ($stagedChanges) {
  git commit -m "feat: publish Moris Beauty storefront v1.0.2"
} else {
  Write-Host "No uncommitted files to commit."
}

git branch -M main

Write-Host "[6/6] Publishing instructions"
if ($CreateWithGitHubCli) {
  gh auth status
  $existingRemote = git remote get-url origin 2>$null
  if ($LASTEXITCODE -eq 0 -and $existingRemote) {
    git push -u origin main
  } else {
    gh repo create "$GitHubUsername/$RepositoryName" `
      --public `
      --source . `
      --remote origin `
      --push `
      --description "Premium mobile-first Mauritian beauty storefront with Next.js and selective 3D."
  }
} else {
  Write-Host ""
  Write-Host "Local repository is validated and ready."
  Write-Host "Create a PUBLIC empty GitHub repository named '$RepositoryName', then run:"
  Write-Host "git remote add origin https://github.com/$GitHubUsername/$RepositoryName.git"
  Write-Host "git push -u origin main"
}
