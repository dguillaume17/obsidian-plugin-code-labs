/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, MarkdownPostProcessorContext, MarkdownRenderer, Plugin, PluginManifest } from 'obsidian';
import { SettingsScreen } from './settings-screen';
import { PluginManagerService } from './plugin-manager.service';
import { from, lastValueFrom, map, Observable } from 'rxjs';
import { PluginFacade } from './plugin-facade';
import { SettingsObject } from './settings-object.interface';

export default class CodeLabsPlugin extends Plugin implements PluginFacade {

    // Inner properties

    private _pluginManager: PluginManagerService;
    private _settingsScreen: SettingsScreen;

    // Lifecycle

    constructor(
        app: App,
        manifest: PluginManifest
    ) {
        super(app, manifest);

        this._settingsScreen = new SettingsScreen(
            this,
            this.app
        );
        this._pluginManager = new PluginManagerService(
            this,
            this._settingsScreen
        );
    }

	public async onload() {
        return lastValueFrom(this._pluginManager.initialize$());

	}

	public onunload() {}

    // Casting to observables

    private loadData$(): Observable<any> {
        return from(this.loadData());
    }

    private saveData$(data: any): Observable<void> {
        return from(this.saveData(data));
    }

    private registerMarkdownCodeBlockProcessor$(
        language: string,
        handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Observable<void>
    ) {
        this.registerMarkdownCodeBlockProcessor(
            language,
            (source, el, ctx) => {
                lastValueFrom(handler(source, el, ctx))
            }
        )
    }

    public renderMarkdown$(markdown: string, el: HTMLElement): Observable<void> {
        return from(MarkdownRenderer.renderMarkdown(markdown, el, '', this));
    }

    // Facade implementation

    public defineSettingsScreen(): void {
        this.addSettingTab(this._settingsScreen);
    }

    public buildSettingsScreen(): void {
        this._pluginManager.buildSettingsScreen();
    }

    public loadSettingsObject$(): Observable<SettingsObject> {
        const defaultSettingsObject: SettingsObject = {
            delay: 0,
            gitCommand: 'git'
        };

        return this.loadData$().pipe(
            map(data => {
                const settingsObject = Object.assign({}, defaultSettingsObject, data);

                return settingsObject;
            })
        );
    }

    public saveSettingsObject$(settingsObject: SettingsObject): Observable<void> {
        return this.saveData$(settingsObject);
    }

    public registerCodeBlock$(
        language: string,
        handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Observable<void>
    ): void {
        this.registerMarkdownCodeBlockProcessor$(language, handler);
    }

    public renderMarkdownCodeBlock$(language: string, content: string, el: HTMLElement): Observable<void> {
        const delimitor = "```";

        return this.renderMarkdown$(`${delimitor}${language}\n${content}\n${delimitor}`, el);
    }
}
