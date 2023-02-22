import { App, PluginSettingTab, Setting } from 'obsidian';
import CustomPlugin from './plugin';

export class CustomPluginSettingTab extends PluginSettingTab {

    // Lifecycle

	constructor(
        private _customPlugin: CustomPlugin,
        app: App
    ) {
		super(app, _customPlugin);
	}

	public display() {
		const containerEl = this.containerEl;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('GIT command')
			.addText(text => text
				.setValue(this._customPlugin.stringSettings.GIT_COMMAND)
				.onChange(async value => {
					this._customPlugin.stringSettings.GIT_COMMAND = value;
					await this._customPlugin.saveSettings();
				}));
	}
}
