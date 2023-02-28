import { App, Plugin, PluginManifest } from 'obsidian';
import { CodeLabsSettingTab } from './code-labs.setting-tab';
import { SettingValues } from './setting-values.interface';
import { DEFAULT_SETTINGS_DATA } from './constants';

export default class CodeLabs extends Plugin {

    // Inner properties

    private _settingValues: SettingValues;
    private _settingTab: CodeLabsSettingTab;

    // Calculated properties

    public get settingValues(): SettingValues {
        return this._settingValues;
    }

    // Lifecycle

    constructor(
        app: App,
        manifest: PluginManifest
    ) {
        super(app, manifest);

        this._settingTab = new CodeLabsSettingTab(
            this,
            this.app
        );
    }

	public async onload() {
        await this.loadSettingValues();

        this.registerMarkdownCodeBlockProcessor(
            'test',
            (source, el, ctx) => {
                const button = document.createElement('button');
                button.addEventListener('click', () => {
                    console.log('click')
                });
                el.appendChild(button);
            }
        )

	}

	public onunload() {}

    // Interface

    public async saveSettingValues() {
        await this.saveData(this._settingValues);
    }

    // Inner work

    private async loadSettingValues() {
        const rawData = await this.loadData();
    
        this._settingValues = Object.assign({}, DEFAULT_SETTINGS_DATA, rawData);
    }
}
