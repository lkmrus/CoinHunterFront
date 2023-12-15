<template>
    <footer class="layout-footer">
        <div class="layout-footer__content">
            <div class="left-content">
                <svg-icon
                    class="logo"
                    icon="logo"
                />
                <div class="lang">
                    Русский
                    <svg-icon icon="down-arrow" />
                </div>
            </div>
            <nav class="navigation">
                <ol class="navigation__items">
                    <li class="nav-1">
                        Межбиржевой арбитраж
                    </li>
                    <li class="nav-2">
                        Преимущества
                    </li>
                    <li class="nav-3">
                        Гайды
                    </li>
                    <li class="nav-4">
                        Внутрибиржевой арбитраж
                    </li>
                    <li class="nav-5">
                        Сообщество
                    </li>
                    <li class="nav-6">
                        Обучающие видео
                    </li>
                    <li class="nav-7">
                        Биржи и коммиссии
                    </li>
                </ol>
            </nav>
        </div>
    </footer>
</template>

<script setup>
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
            justify-content: center;
        }
        .logo{
            cursor: pointer;
            margin-right: 32px;
        }
        .lang{
            @include text-md-mixin;
            color: var(--text-gray-light);
            padding-left: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            &:hover{
                opacity: 0.8;
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
