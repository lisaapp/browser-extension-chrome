import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';

const { version } = packageJson;

const [ major, minor, patch, label = '0' ] = version.replace(/[^\d.-]+/g, '').split(/[.-]/);

export default defineManifest(async env => ({
    manifest_version: 3,
    name: env.mode === 'production' ? 'lisa.app' : 'lisa.app (dev mode)',
    version: `${ major }.${ minor }.${ patch }.${ label }`,
    version_name: version,
    description: 'lisa.app',
    icons: {
        16: 'src/assets/vue.svg'
    },
    action: {
        default_popup: 'src/html/popup.html'
    },
    background: {
        service_worker: 'src/lib/background.ts'
    },
    content_security_policy: {
        extension_pages: `script-src 'self' `

    },
    content_scripts: [
        {
            matches: [ '<all_urls>' ],
            js: [
                'src/content-scripts/main.ts',
                'src/lib/monitoring/logger.ts',
                'src/lib/browser/message.ts',
                'src/lib/recorder.ts',
                'src/lib/popup.ts'
            ]
        }
    ],
    host_permissions: [ '*://*/*' ],

    web_accessible_resources: [
        {
            matches: [ '<all_urls>' ],
            resources: [ 'src/assets/*' ]
        },
        {
            'matches': [ '*://*/*' ],
            'resources': [ 'src/content-scripts/main.ts' ]
        }
    ],
    permissions: [
        'storage',
        'tabs',
        'activeTab',
        'scripting',
        'webRequest',
        'tabCapture',
        'background'
    ]
}));
