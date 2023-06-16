<script setup
        lang="ts">

import {VideoPlay} from '@element-plus/icons-vue';
import {ref} from 'vue';
import {useSocketStore} from './stores/state-store.ts';
// import 'element-plus/es/components/button/style/css';
// import { defineComponent, ref } from 'vue';
//
// export default defineComponent({
//     name: 'App',
//     // components: {
//     //     ElButton
//     // },
//     setup() {
//         return {
//             msg: 'Vite + Vue + TS'
//         };
//     }
// });

const activeName = ref('first');

const handleClick = (tab: any, event: Event) => {
    console.log(tab, event);
};

interface Status {
    name: string;
    status: string;
}

const statuses: Status[] = [
    {
        name: 'Socket connection',
        status: 'Not connected'
    },
    {
        name: 'Tab recording',
        status: 'Not started'
    }
];

const statusChange = (index: number, row: Status) => {
    console.log(index, row);
};

const stateStore = useSocketStore();

</script>

<template>
    <div class="w-[500px] flex flex-col gap-4">

        asd f asdf as df as df asdf
        <el-alert title="You haven't confirmed your email address!"
                  type="warning"
                  effect="dark"
                  close-text="Resend email.."
                  show-icon/>

        <div class="flex justify-between">
            <div class="">
                <a href="https://vitejs.dev"
                   target="_blank">
                    <img src="/vite.svg"
                         class="logo"
                         alt="Vite logo"/>
                </a>

            </div>
            <div class="">
                <el-button type="success">
                    Record screen
                    <el-icon class="ml-1">
                        <VideoPlay/>
                    </el-icon>
                </el-button>
            </div>
        </div>

        <div class="">
            <el-progress
                    :percentage="50"
                    status="success"
                    :indeterminate="true"
                    :duration="5"
            />
        </div>
        <div class="w-full">
            <el-table :data="statuses"
                      class="w-full">
                <el-table-column label="Name">
                    <template #default="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column label="Status">
                    <template #default="scope">
                        <el-popover effect="light"
                                    trigger="hover"
                                    placement="bottom"
                                    width="auto">
                            <template #default>
                                <div>name: a</div>
                                <div>address: b</div>
                            </template>
                            <template #reference>
                                <el-tag>{{ scope.row.status }}</el-tag>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label=""
                                 align="right"
                                 width="150">
                    <template #default="scope">
                        <el-button size="small"
                                   type="danger"
                                   @click="statusChange(scope.$index, scope.row)">
                            Reset
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-tabs v-model="activeName"
                 class="demo-tabs"
                 stretch="true"
                 @tab-click="handleClick">
            <el-tab-pane label="Dashboard"
                         name="dashboard">
                Dashboard
            </el-tab-pane>
            <el-tab-pane label="Settings"
                         name="settings">
                Settings
                <el-button type="info">Default</el-button>
                <el-button type="primary">Primary</el-button>
                <el-button type="success">Success</el-button>
                <el-button type="info">Info</el-button>
                <el-button type="warning">Warning</el-button>
                <el-button type="danger">Danger</el-button>
            </el-tab-pane>

        </el-tabs>

        <div class="">
            Video stream playback:
            <video id="video"
                   style="width: 300px; height: 300px; border: 1px solid red;"></video>

            Latest video -> image:
            <canvas id="canvas"
                    style="width: 300px; height: 300px; border: 1px solid blue;"></canvas>
            <h1 id="countex">test</h1>        

        </div>
    </div>
</template>

