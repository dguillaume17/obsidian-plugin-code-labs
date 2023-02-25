import { MarkdownPostProcessorContext } from 'obsidian';
import { Observable } from 'rxjs';
import { SettingsObject } from './settings-object.interface';
import { SettingsScreen } from './settings-screen';

export interface PluginFacade {

    defineSettingsScreen(settingsScreen: SettingsScreen): void;

    loadSettingsObject$(): Observable<SettingsObject>;

    saveSettingsObject$(settingsObject: SettingsObject): Observable<void>;

    registerCodeBlock$(
        language: string,
        handler: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Observable<void>
    ): void;

    renderMarkdownCodeBlock$(language: string, content: string, el: HTMLElement): Observable<void>;

}