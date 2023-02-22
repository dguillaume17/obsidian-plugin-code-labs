import { ShellService } from './shell.service';

export class GitService {

    // Lifecycle

    constructor(
        private _shellService: ShellService
    ) {}

    // Interface

    public run() {
        this._shellService.runCommand('git --version', '.').subscribe(console.log);

        this._shellService.runCommand('git diff', 'D:/Data/Sources/github-gder/obsidian-plugin-code-labs').subscribe(console.log);
    }
}