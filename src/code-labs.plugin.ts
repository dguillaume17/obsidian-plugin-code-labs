import { App, Plugin, PluginManifest } from 'obsidian';
import { CodeLabsSettingTab } from './code-labs.setting-tab';
import { SettingValues } from './setting-values.interface';
import { DEFAULT_SETTINGS_DATA } from './constants';
import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui-slim.js';
import { Diff2HtmlUIConfig } from 'diff2html/lib/ui/js/diff2html-ui-base';

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
                // const button = document.createElement('button');
                // button.addEventListener('click', () => {
                //     console.log('click')
                // });
                // el.appendChild(button);

                const childElRoot = el.createDiv();
                childElRoot.style.setProperty('all', 'initial')
                const childElShadow = childElRoot.attachShadow({mode: 'open'})
                const childEl = childElShadow.createDiv();

                const configuration: Diff2HtmlUIConfig = {
                    drawFileList: false,
                    fileListToggle: false,
                    fileListStartVisible: false,
                    fileContentToggle: false,
                    matching: 'lines',
                    outputFormat: 'line-by-line',
                    synchronisedScroll: true,
                    highlight: true,
                    renderNothingWhenEmpty: false,
                };
                const diffString = `diff --git a/esbuild.config.mjs b/esbuild.config.mjs
index b8e500d..89435c5 100644
--- a/esbuild.config.mjs
+++ b/esbuild.config.mjs
@@ -15,7 +15,7 @@ const context = await esbuild.context({
        banner: {
            js: banner,
        },
-	entryPoints: ["src/main.ts"],
+	entryPoints: ["src/code-labs.plugin.ts"],
        bundle: true,
        external: [
            "obsidian",
diff --git a/src/TODO/markdown-code-block-processor.service.ts b/src/TODO/markdown-code-block-processor.service.ts
index 667bdca..7c4dee4 100644
--- a/src/TODO/markdown-code-block-processor.service.ts
+++ b/src/TODO/markdown-code-block-processor.service.ts
@@ -1,13 +1,13 @@
    import { MarkdownRenderer } from 'obsidian';
    import { from, lastValueFrom, Observable } from 'rxjs';
-import CodeLabsPlugin from '../main';
+import CodeLabs from '../code-labs.plugin';
    
    export class MarkdownCodeBlockProcessorService {
    
        // Lifecycle
    
        constructor(
-        private _codeLabsPlugin: CodeLabsPlugin,
+        private _codeLabsPlugin: CodeLabs,
            private _el: HTMLElement
        ) {}`;
                const diff2htmlUi = new Diff2HtmlUI(childEl, diffString, configuration);
                diff2htmlUi.draw();
                diff2htmlUi.highlightCode();

                console.log(childEl);
                console.log(diffString);

                const link1  = document.createElement('link');
                link1.rel  = 'stylesheet';
                link1.type = 'text/css';
                link1.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/github.min.css';
                childEl.appendChild(link1);

                const link2  = document.createElement('link');
                link2.rel  = 'stylesheet';
                link2.type = 'text/css';
                link2.href = 'https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css';
                childEl.appendChild(link2);

                childEl.style.setProperty('background', 'white');
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
