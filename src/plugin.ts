import { Plugin } from 'obsidian';
import { CustomPluginSettingTab } from './setting-tab';
import { StringSettings } from './models/string-settings.interface';
import { NumberSettings } from './models/number-settings.interface';
import { SettingKey } from './models/setting-key.enum';
import { GitService } from './services/git.service';
import { ShellService } from './services/shell.service';

export default class CustomPlugin extends Plugin {

    // Public properties

    public numberSettings: NumberSettings;
	public stringSettings: StringSettings;

    // Lifecycle

	public async onload() {
        console.log('onload 2');
		await this.loadSettings();

        const shellService = new ShellService();
        const gitService = new GitService(shellService);
        gitService.run();

		this.addSettingTab(new CustomPluginSettingTab(this, this.app));
	}

	public onunload() {}

    // Interface

	public async loadSettings() {
        const defaultSettings: NumberSettings & StringSettings = {
            [SettingKey.GitCommand]: 'git',
            [SettingKey.Delay]: 0
        };

		const allSettings = Object.assign({}, defaultSettings, await this.loadData());

        this.numberSettings = allSettings;
        this.stringSettings = allSettings;
	}

	public async saveSettings() {
		await this.saveData(this.stringSettings);
	}
}
