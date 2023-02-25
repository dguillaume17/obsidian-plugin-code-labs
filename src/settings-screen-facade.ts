import { Observable } from 'rxjs';

export interface SettingsScreenFacade {

    addStringSetting(
        description: string,
        value: string,
        onChangeFn: (value: string) => Observable<void>
    ): void;
    
}