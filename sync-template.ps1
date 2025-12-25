# Sync Template Script
# This script helps merge updates from the weblet-theme-template safely

Write-Host "Syncing from weblet-theme-template..." -ForegroundColor Cyan

# Fetch latest changes from upstream
Write-Host "Fetching upstream changes..." -ForegroundColor Yellow
git fetch upstream

# Check if there are changes
$changes = git log HEAD..upstream/main --oneline
if ($changes) {
    Write-Host "`nChanges available from template:" -ForegroundColor Green
    Write-Host $changes
    
    # Show files that would be affected
    Write-Host "`nFiles that will be updated:" -ForegroundColor Yellow
    git diff --name-only HEAD..upstream/main
    
    # Ask for confirmation
    $response = Read-Host "`nDo you want to merge these changes? (y/n)"
    
    if ($response -eq 'y') {
        # Create a backup branch
        $backupBranch = "backup-$(Get-Date -Format 'yyyy-MM-dd-HHmmss')"
        Write-Host "`nCreating backup branch: $backupBranch" -ForegroundColor Cyan
        git branch $backupBranch
        
        # Attempt merge
        Write-Host "Merging upstream/main..." -ForegroundColor Yellow
        git merge upstream/main --no-ff -m "chore: sync with template $(Get-Date -Format 'yyyy-MM-dd')"
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "`nMerge conflicts detected!" -ForegroundColor Red
            Write-Host "Conflicted files:" -ForegroundColor Yellow
            git diff --name-only --diff-filter=U
            Write-Host "`nResolve conflicts manually, then:" -ForegroundColor Cyan
            Write-Host "  git add <resolved-files>"
            Write-Host "  git commit"
            Write-Host "`nOr to abort the merge:"
            Write-Host "  git merge --abort"
            Write-Host "  git checkout $backupBranch  # to restore backup"
        }
        else {
            Write-Host "`nMerge successful!" -ForegroundColor Green
            Write-Host "You can delete the backup branch with: git branch -d $backupBranch"
        }
    }
    else {
        Write-Host "Merge cancelled." -ForegroundColor Yellow
    }
}
else {
    Write-Host "`nNo new changes from template." -ForegroundColor Green
}
