<template>
    <div class="page-header-index-wide">
        <a-card :bordered="true" :bodyStyle="{  height: '100%' }" :style="{ height: '100%',width:'70%',margin:'50px auto' }">
            <div class="account-settings-info-main" >
                <div class="account-settings-info-left">
                    <a-menu
                            mode="inline"
                            :style="{ border: '0', width: 'auto'}"
                            type="inner"
                            @openChange="onOpenChange"
                    >
                        <a-menu-item key="/account/settings/base">
                            <router-link to="/account/setting/base_setting">
                                基本设置
                            </router-link>
                        </a-menu-item>
                        <!--<a-menu-item key="/account/settings/custom">-->
                            <!--<router-link to="/account/setting/personalize">-->
                                <!--个性化-->
                            <!--</router-link>-->
                        <!--</a-menu-item>-->
                    </a-menu>
                </div>
                <div class="account-settings-info-right">
                    <div class="account-settings-info-title">
                        <span>{{ $route.meta.title }}</span>
                    </div>
                    <router-view></router-view>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        mode: 'inline',
        openKeys: [],
      }
    },

    methods: {
      onOpenChange (openKeys) {
        this.openKeys = openKeys
      },

    }
  }
</script>

<style lang="less" scoped>
    .account-settings-info-main {
        width: 100%;
        display: flex;
        height: 100%;
        overflow: auto;

        &.mobile {
            display: block;

            .account-settings-info-left {
                border-right: unset;
                border-bottom: 1px solid #e8e8e8;
                width: 100%;
                height: 50px;
                overflow-x: auto;
                overflow-y: scroll;
            }
            .account-settings-info-right {
                padding: 20px 40px;
            }
        }

        .account-settings-info-left {
            border-right: 1px solid #e8e8e8;
            width: 224px;
        }

        .account-settings-info-right {
            flex: 1 1;
            padding: 8px 40px;

            .account-settings-info-title {
                color: rgba(0,0,0,.85);
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                margin-bottom: 12px;
            }
            .account-settings-info-view {
                padding-top: 12px;
            }
        }
    }

</style>

