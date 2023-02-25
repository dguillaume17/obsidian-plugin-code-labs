import { App, PluginSettingTab, Setting } from 'obsidian';
import { lastValueFrom, Observable } from 'rxjs';
import CodeLabsPlugin from './main';
import { SettingsScreenFacade } from './settings-screen-facade';

export class SettingsScreen extends PluginSettingTab implements SettingsScreenFacade {

    // Lifecycle

	constructor(
        private _plugin: CodeLabsPlugin,
        app: App,
    ) {
		super(app, _plugin);
    }

	public display() {
        this._plugin.buildSettingsScreen();
	}

    // Facade implementation

    public addStringSetting(
        description: string,
        value: string,
        onChangeFn: (value: string) => Observable<void>
    ) {
        new Setting(this.containerEl)
			.setName(description)
			.addText(text => text
				.setValue(value)
				.onChange(async value => {
					lastValueFrom(onChangeFn(value));
				}));
    }
}
