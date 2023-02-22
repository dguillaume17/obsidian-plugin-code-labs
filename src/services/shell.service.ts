import { exec } from 'child_process';
import { Observable } from 'rxjs';

export interface CommandResponse {
    stdout: string;
    stderr: string;
}

export class ShellService {

    // Interface

    public runCommand(command: string, path: string): Observable<CommandResponse> {
        return new Observable(observer => {
            exec(command, {cwd: path}, (error, stdout, stderr) => {
                const commandResponse: CommandResponse = {
                    stdout: stdout,
                    stderr: stderr
                };
                observer.next(commandResponse);
            });
        });
    }

}