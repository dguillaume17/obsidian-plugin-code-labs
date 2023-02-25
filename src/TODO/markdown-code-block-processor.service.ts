import { MarkdownRenderer } from 'obsidian';
import { from, lastValueFrom, Observable } from 'rxjs';
import CodeLabsPlugin from '../main';

export class MarkdownCodeBlockProcessorService {

    // Lifecycle

    constructor(
        private _codeLabsPlugin: CodeLabsPlugin,
        private _el: HTMLElement
    ) {}

    // Interface

    // public register(): Observable<void> {
    //     this._codeLabsPlugin.registerMarkdownCodeBlockProcessor(`test`, async (meta, el, ctx) => {
    //         return lastValueFrom(from(
    //             MarkdownRenderer.renderMarkdown('```' + lang + '\n' + src + '\n```', this._el, '', this)
    //         ));
    //     });
    // }

}