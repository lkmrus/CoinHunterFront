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
                <div class="lang">
                    Русский
                    <svg-icon icon="down-arrow" />
                </div>
                <div
                    v-if="!isAuthenticated"
                    class="buttons"
                >
                    <button-custom
                        value="Регистрация"
                        @click="goToAuthPage('/auth', {type: 'registration'})"
                    />
                    <button-custom
                        dark-blue
                        value="Вход"
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
                        class="menu"
                        :class="{'menu_open' : accountMenuOpen}"
                    >
                        <div
                            class="menu__item"
                            @click="goToAuthPage('/account')"
                        >
                            Личный кабинет
                        </div>
                        <div
                            class="menu__item"
                            @click="logout()"
                        >
                            Выйти
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
const { authenticated } = await storeToRefs(useAuthStore())
const { logUserOut } = useAuthStore()

const isAuthenticated = ref(authenticated.value)
const accountMenuOpen = ref(false)
const headerKey = ref(0)

const hamburgerOpen = ref(false)

const navs = reactive([
  {
    name: 'Компания',
    menu: [
      { name: 'Преимущества', link: '#' },
      { name: 'Сообщество', link: '#' }
    ],
    isActive: false
  },
  {
    name: 'Инструменты арбитража',
    menu: [
      { name: 'Межбиржевой арбитраж', link: '#' },
      { name: 'Внутрибиржевой арбитраж', link: '#' },
      { name: 'Биржи и коммиссии', link: '#' }
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

const getArrowColor = (isActive) => {
  if (isActive) { return '#FFFFFF' }
  return '#8C8FA8'
}

watch(() => authenticated, (newval) => {
  isAuthenticated.value = toRaw(newval).value
}, { immediate: true, deep: true })

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
        @include text-md-mixin;
        margin-right: 24px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        &:hover{
            opacity: 0.8;
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
    .menu{
        user-select: none;
        display: none;
        width: fit-content;
        position: absolute;
        left: -5px;
        top: 23px;
        padding: 6px 0;
        border-radius: 16px;
        overflow: hidden;
        z-index: 2000;
        background-color: var(--bg-dark-blue);
        &__item{
            display: block;
            cursor: pointer;
            padding: 8px 16px;
            text-wrap: nowrap;
            color: var(--text-gray-dark);
            &:hover{
                background-color: var(--bg-blue);
                color: var(--text-color);
            }
        }
        &_open{
            display: block;
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
