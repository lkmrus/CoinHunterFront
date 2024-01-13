<template>
    <header
        :key="headerKey"
        class="layout-header"
    >
        <svg-icon
            class="logo"
            icon="logo"
            @click="goToAuthPage('/')"
        />
        <div
            class="layout-header__content"
            :class="{'active': hamburgerOpen}"
        >
            <nav class="nav">
                <ol class="nav__items">
                    <li
                        v-for="(nav, navIndex) in navs"
                        :key="`nav-item-${navIndex}`"
                        @mouseenter="nav.isActive = true"
                        @mouseleave="nav.isActive = false"
                    >
                        <div
                            class="name"
                            :class="{'active': nav.isActive}"
                        >
                            {{ nav.name }}
                        </div>
                        <svg-icon
                            class="down-arrow"
                            :class="{'down-arrow_active': nav.isActive}"
                            icon="down-arrow"
                            :fill="getArrowColor(nav.isActive)"
                        />
                        <div
                            class="menu"
                            :class="{'menu_open': nav.isActive}"
                        >
                            <NuxtLink
                                v-for="(menu, menuIndex) in nav.menu"
                                :key="`nav-menu-item-${menuIndex}`"
                                class="menu__item"
                                :to="menu.link"
                            >
                                {{ menu.name }}
                            </NuxtLink>
                        </div>
                    </li>
                </ol>
            </nav>
            <div class="right-content">
                <div
                    class="lang"
                    @mouseleave="langOpen = false"
                >
                    <div
                        class="lang__name"
                        @click="langOpen = !langOpen"
                    >
                        {{ activeLocaleName.name }}
                        <div
                            class="lang-drop-down"
                            :class="{'lang-drop-down_open': langOpen}"
                        >
                            <svg-icon icon="down-arrow" />
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
                <div
                    v-if="!isAuthenticated"
                    class="buttons"
                >
                    <button-custom
                        :value="$t('layout_header_registration')"
                        @click="goToAuthPage('/auth', {type: 'registration'})"
                    />
                    <button-custom
                        dark-blue
                        :value="$t('layout_header_login')"
                        @click="goToAuthPage('/auth')"
                    />
                </div>
                <div
                    v-else
                    class="account"
                    @mouseleave="accountMenuOpen = false"
                >
                    <div
                        class="account__profile"
                        @click="accountMenuOpen = !accountMenuOpen"
                    >
                        <div class="avatar">
                            <svg-icon icon="account" />
                        </div>
                        <div
                            class="dropwdown"
                            :class="{'dropwdown_open': accountMenuOpen}"
                        >
                            <svg-icon icon="down-arrow" />
                        </div>
                    </div>

                    <div
                        class="lang__name lang__name_mobile"
                        @click="accountMenuOpen = !accountMenuOpen"
                    >
                        {{ $t("layout_header_account_menu_lk") }}
                        <div
                            class="lang-drop-down"
                            :class="{'lang-drop-down_open': accountMenuOpen}"
                        >
                            <svg-icon icon="down-arrow" />
                        </div>
                    </div>

                    <div
                        class="menu menu_mobile"
                        :class="{'menu_open' : accountMenuOpen}"
                    >
                        <div
                            class="menu__item"
                            @click="goToAuthPage('/account')"
                        >
                            {{ $t('layout_header_account_menu_lk') }}
                        </div>
                        <div
                            class="menu__item"
                            @click="logout()"
                        >
                            {{ $t('layout_header_account_menu_logout') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="hamburger"
            :class="{'active': hamburgerOpen}"
            @click="hamburgerOpen = !hamburgerOpen"
        >
            <span class="bar" />
            <span class="bar" />
            <span class="bar" />
        </div>
    </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/auth'
const { t } = useI18n({ useScope: 'global' })
const { authenticated } = await storeToRefs(useAuthStore())
const { logUserOut } = useAuthStore()
const { locale, locales } = useI18n()
const route = useRoute()
const activeLocaleName = computed(() => {
  return (locales.value).find(i => i.code === locale.value)
})
const isAuthenticated = ref(authenticated.value)
const accountMenuOpen = ref(false)
const headerKey = ref(0)
const langOpen = ref(false)
const hamburgerOpen = ref(false)

const navs = reactive([
//   {
//     name: t('layout_header_nav_1_name'),
//     menu: [
//       { name: t('layout_nav_1_menu_1'), link: '#' },
//       { name: t('layout_nav_1_menu_2'), link: '#' }
//     ],
//     isActive: false
//   },
  {
    name: t('layout_header_nav_2_name'),
    menu: [
      { name: t('layout_nav_2_menu_1'), link: '/arbitrage' }
    //   { name: t('layout_nav_2_menu_2'), link: '#' },
    //   { name: t('layout_nav_2_menu_3'), link: '#' }
    ],
    isActive: false
  }
])

const goToAuthPage = async (page, query = {}) => {
  await navigateTo({
    path: page,
    query
  })
}

const setLang = async (langCode) => {
  const siteLang = await useCookie('i18n_redirected')
  siteLang.value = langCode
  location.reload()
}

const getArrowColor = (isActive) => {
  if (isActive) { return '#FFFFFF' }
  return '#8C8FA8'
}

watch(() => authenticated, (newval) => {
  isAuthenticated.value = toRaw(newval).value
}, { immediate: true, deep: true })

watch(() => route.path, () => {
  hamburgerOpen.value = false
})

const logout = async () => {
  await logUserOut()
  isAuthenticated.value = false
  accountMenuOpen.value = false
}

</script>

<style lang="scss" scoped>
.layout-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 68px;
    background-color: var(--bg-color);
    &__content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        float: right;
        width: 100%;
    }
    .logo{
        cursor: pointer;
        margin-right: 32px;
    }
    .left-content, .right-content{
        display: flex;
        align-items: center;
    }
    .hamburger{
        display: none;
        cursor: pointer;
        .bar{
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px auto;
            --webkit-transition: all 0.3 ease-in-out;
            transition: all 0.3 ease-in-out;
            background-color: white;
        }
    }
    .nav{
        &__items{
            display: flex;
            align-items: center;
            gap: 37px;
            li{
                position: relative;
                @include text-md-mixin;
                cursor: pointer;
                color: var(--text-gray-dark);
                display: flex;
                align-items: center;
                gap: 8px;
                text-wrap: nowrap;
                .name{
                    &:hover, &.active{
                        color: var(--text-color);
                    }
                }
                .down-arrow{
                    transition: 0.3s;
                    &_active{
                        transition: 0.3s;
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
    .lang{
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
            .lang-drop-down{
                transition: 0.3s;
                &_open{
                    transition: 0.3s;
                    transform: rotate(180deg);
                }
            }
            &_mobile {
                display: none;
            }
        }
    }
    .buttons{
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .account{
        position: relative;
        &__profile{
            cursor: pointer;
            display: flex;
            align-items: center;
            .avatar{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                background-color: var(--bg-dark-blue);
                border-radius: 100%;
                margin-right: 8px;
                img{
                    object-fit: cover;
                }
            }
            .dropwdown{
                transition: 0.3s;
                &_open{
                    transition: 0.3s;
                    transform: rotate(180deg);
                }
            }
        }
        .menu{
            right: -50%;
            left: auto;
            top: 44px;
        }
    }
}

@media (max-width: 1360px) {
    .layout-header{
        .logo{
            width: 150px;
            margin-right: 15px;
        }
        .nav{
            &__items{
                gap: 10px;
            }
        }
        .lang{
            margin-right: 10px;
        }
        .buttons{
            .button{
                font-size: 16px;
                padding: 4px 12px;
                height: 36px;
            }
        }
    }
}

@media (max-width: 920px) {
    .layout-header{
        .logo{
            z-index: 1000;
        }
        &__content{
            width: 100%;
            position: fixed;
            top: 0;
            right: -100%;
            padding: 100px 50px;
            flex-direction: column;
            text-align: center;
            transition: 0.3s;
            gap: 0;
            border-radius: 0px 0px 0px 8px;
            background-color: var(--bg-color);
            max-height: 100%;
            height: 100vh;
            overflow: auto;
            justify-content: center;
            align-items: flex-start;
            z-index: 500;
            &.active{
                right: 0;
            }
            .nav{
                padding: 0 calc(50% - 322px);
                margin-bottom: 20px;
                &__items{
                    gap: 20px;
                    align-items: baseline;
                    flex-direction: column;
                }
            }
            .right-content{
                padding: 0 calc(50% - 322px);
                flex-direction: column;
                align-items: baseline;
            }
            .lang{
                margin-right: 0;
                margin-bottom: 20px;
                &__name {
                    &_mobile {
                        display: flex;
                    }
                }
            }
            .buttons{
                flex-direction: column;
                gap: 20px;
                .button{
                    min-width: 220px;
                    font-size: 20px;
                    padding: 8px 24px;
                    height: 44px;
                }
            }
            .account{
                &__profile{
                    display: none;
                }
                &__menu{
                    display: flex;
                    flex-direction: column;
                    position: initial;
                    background-color: transparent;
                    padding: 0;
                    gap: 20px;
                    align-items: flex-start;
                    .item{
                        padding: 0;
                    }
            }

            .menu {
                &_mobile {
                        top: 24px;
                        left: -5px;
                    }
                }
            }
        }
        .hamburger{
            display: block;
            z-index: 1000;
            &.active{
                .bar{
                    &:nth-child(2){
                        opacity: 0;
                    }
                    &:nth-child(1){
                        transform: translateY(8px) rotate(45deg);
                    }
                    &:nth-child(3){
                        transform: translateY(-8px) rotate(-45deg);
                    }
                }
            }
        }
    }
}

@media (max-width: 720px) {
    .layout-header{
        &__content{
            padding: 100px 24px;
            .nav, .right-content{
                padding: 0;
            }
        }
    }
}
</style>
