import { map, Observable, tap } from 'rxjs';
import { PluginFacade } from './plugin-facade';
import { SettingsObject } from './settings-object.interface';
import { SettingsScreenFacade } from './settings-screen-facade';

export class PluginManagerService {

    // Public properties

    public settingsObject: SettingsObject;

    // Lifecycle

    constructor(
        private _pluginFacade: PluginFacade,
        private _settingsScreenFacade: SettingsScreenFacade
    ) {}

    public initialize$(): Observable<void> {
        console.log('initialize 2');

        return this._pluginFacade.loadSettingsObject$()
            .pipe(
                map(settingsObject => {
                    this.settingsObject = settingsObject;
                }),
                tap(() => {
                    this._pluginFacade.registerCodeBlock$('test', (source, el, ctx) => {
                        this._pluginFacade.renderMarkdownCodeBlock$('typescript', 'const a = b;', el);
                    })
                })
            );
    }

    // Interface

    public buildSettingsScreen() {
        this._settingsScreenFacade.addStringSetting(
            'GIT command 2',
            'git',
            value => {
                this.settingsObject.gitCommand = value;
                return this._pluginFacade.saveSettingsObject$(this.settingsObject);
            }
        )
    }
}