<template>
    <footer class="layout-footer">
        <div class="layout-footer__content">
            <div class="left-content">
                <svg-icon
                    class="logo"
                    icon="logo"
                />
                <div
                    class="lang"
                    @mouseleave="langOpen = false"
                >
                    <div
                        class="lang__name"
                        @click="langOpen = !langOpen"
                    >
                        {{ activeLocaleName.name }}
                        <div class="down-arrow">
                            <svg-icon
                                :class="{'down-arrow_open': langOpen}"
                                icon="down-arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="menu"
                        :class="{'menu_open' : langOpen}"
                    >
                        <div
                            v-for="lang in locales"
                            :key="lang.code"
                            class="menu__item"
                            :class="{'menu__item_active': activeLocaleName.code === lang.code}"
                            @click="setLang(lang.code)"
                        >
                            {{ lang.name }}
                        </div>
                    </div>
                </div>
            </div>
            <nav class="navigation">
                <ol class="navigation__items">
                    <li
                        v-for="(navItem, itemIndex) in navItems"
                        :key="`footer-item-${itemIndex}`"
                    >
                        <NuxtLink
                            :class="`nav-${itemIndex + 1}`"
                            :to="navItem.link"
                        >
                            {{ navItem.name }}
                        </NuxtLink>
                    </li>
                </ol>
            </nav>
        </div>
    </footer>
</template>

<script setup>
const { t } = useI18n({ useScope: 'global' })
const { locale, locales } = useI18n()
const activeLocaleName = computed(() => {
  return (locales.value).find(i => i.code === locale.value)
})
const langOpen = ref(false)

const navItems = reactive([
  { name: t('layout_nav_2_menu_1'), link: '/arbitrage' }
//   { name: t('layout_nav_1_menu_1'), link: '#' },
//   { name: t('layout_nav_3_menu_1'), link: '#' },
//   { name: t('layout_nav_2_menu_2'), link: '#' },
//   { name: t('layout_nav_1_menu_2'), link: '#' },
//   { name: t('layout_nav_3_menu_2'), link: '#' },
//   { name: t('layout_nav_2_menu_3'), link: '#' }
])

const setLang = async (langCode) => {
  const siteLang = await useCookie('i18n_redirected')
  siteLang.value = langCode
  location.reload()
}
</script>

<style lang="scss" scoped>
.layout-footer{
    &__content{
        background: var(--bg-color);
        display: flex;
        gap: 184px;
        width: 100%;
        height: 152px;
        padding: 24px 0;
        .left-content{
            display: flex;
            gap: 30px;
            flex-direction: column;
        }
        .logo{
            cursor: pointer;
            margin-right: 32px;
        }
        .lang{
            padding-left: 12px;
            position: relative;
            &__name{
                @include text-md-mixin;
                margin-right: 24px;
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                &:hover{
                    opacity: 0.8;
                }
                .down-arrow{
                    transition: 0.3s;
                    &_open{
                        transition: 0.3s;
                        transform: rotate(180deg);
                    }
                }
            }
            .menu{
                bottom: auto;
                top: -100px
            }
        }
        .navigation{
            &__items{
                @include text-xs-mixin;
                display: grid;
                grid-template-columns: 190px 105px 128px;
                grid-column-gap: 184px;
                grid-row-gap: 16px;
                li{
                    cursor: pointer;
                    a {
                        color: #EBEBED
                    }
                }
            }
        }
    }
}

@media (max-width: 1360px) {
    .layout-footer{
        &__content{
            gap: 75px;
            .navigation{
                &__items{
                    grid-column-gap: 75px;
                }
            }
        }
    }
}

@media (max-width: 920px) {
    .layout-footer{
        &__content{
            flex-direction: column;
            align-items: flex-start;
            gap: 35px;
            .navigation{
                &__items{
                    grid-column-gap: 15px;
                }
            }
        }
    }
}

@media (max-width: 520px) {
    .layout-footer{
        &__content{
            .navigation{
                &__items{
                    grid-template-columns: auto, 105px;
                    grid-column-gap: 37px;
                    .nav-1{
                        grid-column: 1;
                        grid-row: 1;
                    }
                    .nav-2{
                        grid-column: 2;
                        grid-row: 1;
                    }
                    .nav-3{
                        grid-column: 2;
                        grid-row: 3;
                    }
                    .nav-4{
                        grid-column: 1;
                        grid-row: 2;
                    }
                    .nav-5{
                        grid-column: 2;
                        grid-row: 2;
                    }
                    .nav-6{
                        grid-column: 1;
                        grid-row: 4;
                    }
                    .nav-7{
                        grid-column: 1;
                        grid-row: 3;
                    }
                }
            }
        }
    }
}

@media (max-width: 350px) {
    .layout-footer{
        &__content{
            .navigation{
                &__items{
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 37px;
                }
            }
        }
    }
}
</style>
