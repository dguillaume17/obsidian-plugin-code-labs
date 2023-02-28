import { App, PluginSettingTab, Setting } from 'obsidian';
import CodeLabs from './code-labs.plugin';

export class CodeLabsSettingTab extends PluginSettingTab {

    // Lifecycle

	constructor(
        private _plugin: CodeLabs,
        app: App,
    ) {
		super(app, _plugin);
    }

	public display() {
        this.addStringSetting(
            'GIT command 2',
            'git',
            value => {
                this._plugin.settingValues.gitCommand = value;
                return this._plugin.saveSettingValues();
            }
        );
	}

    // Facade implementation

    public addStringSetting(
        description: string,
        value: string,
        onChangeFn: (value: string) =>  Promise<void>
    ) {
        new Setting(this.containerEl)
			.setName(description)
			.addText(text => text
				.setValue(value)
				.onChange(async value => {
					await onChangeFn(value)
				}));
    }
}
