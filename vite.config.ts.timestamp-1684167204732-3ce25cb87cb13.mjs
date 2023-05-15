// vite.config.ts
import { crx } from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import { ElementPlusResolver } from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig } from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/vite/dist/node/index.js";

// manifest.config.ts
import { defineManifest } from "file:///Users/matthewdavis/workspace/lisaapp/extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "extension",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vue-tsc && vite build",
    preview: "vite preview"
  },
  dependencies: {
    "element-plus": "^2.3.4",
    vue: "^3.2.47"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.17",
    "@types/chrome": "^0.0.236",
    "@types/node": "^20.1.4",
    "@vitejs/plugin-vue": "^4.1.0",
    autoprefixer: "^10.4.14",
    postcss: "^8.4.23",
    sass: "^1.62.1",
    tailwindcss: "^3.3.2",
    typescript: "^5.0.2",
    "unplugin-element-plus": "^0.7.1",
    "unplugin-vue-components": "^0.24.1",
    vite: "^4.3.2",
    "vue-tsc": "^1.4.2"
  }
};

// manifest.config.ts
var { version } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === "production" ? "lisa.app" : "lisa.app (dev mode)",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: "lisa.app",
  icons: {
    16: "src/assets/vue.svg"
  },
  action: {
    default_popup: "src/html/popup.html"
  },
  background: {
    service_worker: "src/lib/background.ts"
  },
  content_security_policy: {
    extension_pages: `script-src 'self' `
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: [
        "src/lib/monitoring/logger.ts",
        "src/lib/browser/message.ts",
        "src/lib/recorder.ts",
        "src/lib/popup.ts"
      ]
    }
  ],
  host_permissions: ["*://*/*"],
  web_accessible_resources: [
    {
      matches: ["<all_urls>"],
      resources: ["src/assets/*"]
    }
  ],
  permissions: [
    "storage",
    "tabs",
    "activeTab",
    "scripting",
    "webRequest",
    "tabCapture",
    "background"
  ]
}));

// vite.config.ts
var __vite_injected_original_dirname = "/Users/matthewdavis/workspace/lisaapp/extension";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/styles.scss" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: "src/html/popup.html"
      }
    }
  },
  plugins: [
    vue({}),
    crx({ manifest: manifest_config_default }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "src/components.d.ts"
    })
    // ElementPlus({
    //     useSource: true
    // })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9tYXR0aGV3ZGF2aXMvd29ya3NwYWNlL2xpc2FhcHAvZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWF0dGhld2RhdmlzL3dvcmtzcGFjZS9saXNhYXBwL2V4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWF0dGhld2RhdmlzL3dvcmtzcGFjZS9saXNhYXBwL2V4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5cbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICd+Lyc6IGAkeyBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfS9gXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzY3NzOiB7XG5cbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJ+L3N0eWxlcy9zdHlsZXMuc2Nzc1wiIGFzICo7YFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgIG1haW46ICdzcmMvaHRtbC9wb3B1cC5odG1sJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSh7fSksXG4gICAgICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIC8vIGFsbG93IGF1dG8gbG9hZCBtYXJrZG93biBjb21wb25lbnRzIHVuZGVyIGAuL3NyYy9jb21wb25lbnRzL2BcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsgJ3Z1ZScsICdtZCcgXSxcbiAgICAgICAgICAgIC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cbiAgICAgICAgICAgIGluY2x1ZGU6IFsgL1xcLnZ1ZSQvLCAvXFwudnVlXFw/dnVlLywgL1xcLm1kJC8gXSxcbiAgICAgICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuICAgICAgICAgICAgICAgICAgICBpbXBvcnRTdHlsZTogJ3Nhc3MnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJ1xuICAgICAgICB9KVxuICAgICAgICAvLyBFbGVtZW50UGx1cyh7XG4gICAgICAgIC8vICAgICB1c2VTb3VyY2U6IHRydWVcbiAgICAgICAgLy8gfSlcbiAgICBdXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hdHRoZXdkYXZpcy93b3Jrc3BhY2UvbGlzYWFwcC9leHRlbnNpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXR0aGV3ZGF2aXMvd29ya3NwYWNlL2xpc2FhcHAvZXh0ZW5zaW9uL21hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWF0dGhld2RhdmlzL3dvcmtzcGFjZS9saXNhYXBwL2V4dGVuc2lvbi9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCB7IHZlcnNpb24gfSA9IHBhY2thZ2VKc29uO1xuXG5jb25zdCBbIG1ham9yLCBtaW5vciwgcGF0Y2gsIGxhYmVsID0gJzAnIF0gPSB2ZXJzaW9uLnJlcGxhY2UoL1teXFxkLi1dKy9nLCAnJykuc3BsaXQoL1suLV0vKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgZW52ID0+ICh7XG4gICAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgICBuYW1lOiBlbnYubW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2xpc2EuYXBwJyA6ICdsaXNhLmFwcCAoZGV2IG1vZGUpJyxcbiAgICB2ZXJzaW9uOiBgJHsgbWFqb3IgfS4keyBtaW5vciB9LiR7IHBhdGNoIH0uJHsgbGFiZWwgfWAsXG4gICAgdmVyc2lvbl9uYW1lOiB2ZXJzaW9uLFxuICAgIGRlc2NyaXB0aW9uOiAnbGlzYS5hcHAnLFxuICAgIGljb25zOiB7XG4gICAgICAgIDE2OiAnc3JjL2Fzc2V0cy92dWUuc3ZnJ1xuICAgIH0sXG4gICAgYWN0aW9uOiB7XG4gICAgICAgIGRlZmF1bHRfcG9wdXA6ICdzcmMvaHRtbC9wb3B1cC5odG1sJ1xuICAgIH0sXG4gICAgYmFja2dyb3VuZDoge1xuICAgICAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9saWIvYmFja2dyb3VuZC50cydcbiAgICB9LFxuICAgIGNvbnRlbnRfc2VjdXJpdHlfcG9saWN5OiB7XG4gICAgICAgIGV4dGVuc2lvbl9wYWdlczogYHNjcmlwdC1zcmMgJ3NlbGYnIGBcblxuICAgIH0sXG4gICAgY29udGVudF9zY3JpcHRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG1hdGNoZXM6IFsgJzxhbGxfdXJscz4nIF0sXG4gICAgICAgICAgICBqczogW1xuICAgICAgICAgICAgICAgICdzcmMvbGliL21vbml0b3JpbmcvbG9nZ2VyLnRzJyxcbiAgICAgICAgICAgICAgICAnc3JjL2xpYi9icm93c2VyL21lc3NhZ2UudHMnLFxuICAgICAgICAgICAgICAgICdzcmMvbGliL3JlY29yZGVyLnRzJyxcbiAgICAgICAgICAgICAgICAnc3JjL2xpYi9wb3B1cC50cydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgaG9zdF9wZXJtaXNzaW9uczogWyAnKjovLyovKicgXSxcblxuICAgIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBtYXRjaGVzOiBbICc8YWxsX3VybHM+JyBdLFxuICAgICAgICAgICAgcmVzb3VyY2VzOiBbICdzcmMvYXNzZXRzLyonIF1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgcGVybWlzc2lvbnM6IFtcbiAgICAgICAgJ3N0b3JhZ2UnLFxuICAgICAgICAndGFicycsXG4gICAgICAgICdhY3RpdmVUYWInLFxuICAgICAgICAnc2NyaXB0aW5nJyxcbiAgICAgICAgJ3dlYlJlcXVlc3QnLFxuICAgICAgICAndGFiQ2FwdHVyZScsXG4gICAgICAgICdiYWNrZ3JvdW5kJ1xuICAgIF1cbn0pKTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcImV4dGVuc2lvblwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjMuNFwiLFxuICAgIFwidnVlXCI6IFwiXjMuMi40N1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjE3XCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yMzZcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjEuNFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMS4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMjNcIixcbiAgICBcInNhc3NcIjogXCJeMS42Mi4xXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjMuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjAuMlwiLFxuICAgIFwidW5wbHVnaW4tZWxlbWVudC1wbHVzXCI6IFwiXjAuNy4xXCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI0LjFcIixcbiAgICBcInZpdGVcIjogXCJeNC4zLjJcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS40LjJcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULFNBQVMsV0FBVztBQUNuVixPQUFPLFNBQVM7QUFDaEIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsMkJBQTJCO0FBRXBDLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9COzs7QUNOMFMsU0FBUyxzQkFBc0I7OztBQ0F0VztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsU0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsSUFDakIsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsY0FBZ0I7QUFBQSxJQUNoQixTQUFXO0FBQUEsSUFDWCxNQUFRO0FBQUEsSUFDUixhQUFlO0FBQUEsSUFDZixZQUFjO0FBQUEsSUFDZCx5QkFBeUI7QUFBQSxJQUN6QiwyQkFBMkI7QUFBQSxJQUMzQixNQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsRUFDYjtBQUNGOzs7QUQxQkEsSUFBTSxFQUFFLFFBQVEsSUFBSTtBQUVwQixJQUFNLENBQUUsT0FBTyxPQUFPLE9BQU8sUUFBUSxHQUFJLElBQUksUUFBUSxRQUFRLGFBQWEsRUFBRSxFQUFFLE1BQU0sTUFBTTtBQUUxRixJQUFPLDBCQUFRLGVBQWUsT0FBTSxTQUFRO0FBQUEsRUFDeEMsa0JBQWtCO0FBQUEsRUFDbEIsTUFBTSxJQUFJLFNBQVMsZUFBZSxhQUFhO0FBQUEsRUFDL0MsU0FBUyxHQUFJLFNBQVcsU0FBVyxTQUFXO0FBQUEsRUFDOUMsY0FBYztBQUFBLEVBQ2QsYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLElBQ0gsSUFBSTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsWUFBWTtBQUFBLElBQ1IsZ0JBQWdCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLHlCQUF5QjtBQUFBLElBQ3JCLGlCQUFpQjtBQUFBLEVBRXJCO0FBQUEsRUFDQSxpQkFBaUI7QUFBQSxJQUNiO0FBQUEsTUFDSSxTQUFTLENBQUUsWUFBYTtBQUFBLE1BQ3hCLElBQUk7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxrQkFBa0IsQ0FBRSxTQUFVO0FBQUEsRUFFOUIsMEJBQTBCO0FBQUEsSUFDdEI7QUFBQSxNQUNJLFNBQVMsQ0FBRSxZQUFhO0FBQUEsTUFDeEIsV0FBVyxDQUFFLGNBQWU7QUFBQSxJQUNoQztBQUFBLEVBQ0o7QUFBQSxFQUNBLGFBQWE7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSjtBQUNKLEVBQUU7OztBRHRERixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxNQUFNLEdBQVMsYUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDM0M7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFFRixnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxlQUFlO0FBQUEsTUFDWCxPQUFPO0FBQUEsUUFDSCxNQUFNO0FBQUEsTUFDVjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxJQUFJLENBQUMsQ0FBQztBQUFBLElBQ04sSUFBSSxFQUFFLGtDQUFTLENBQUM7QUFBQSxJQUNoQixXQUFXO0FBQUE7QUFBQSxNQUVQLFlBQVksQ0FBRSxPQUFPLElBQUs7QUFBQTtBQUFBLE1BRTFCLFNBQVMsQ0FBRSxVQUFVLGNBQWMsT0FBUTtBQUFBLE1BQzNDLFdBQVc7QUFBQSxRQUNQLG9CQUFvQjtBQUFBLFVBQ2hCLGFBQWE7QUFBQSxRQUNqQixDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSUw7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
