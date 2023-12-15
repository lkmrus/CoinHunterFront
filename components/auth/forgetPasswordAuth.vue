<template>
    <div class="forget-password">
        <div class="forget-password__info">
            <h2 class="title">
                Восстановление пароля
            </h2>
            <span class="subtitle">Отправим вам код из 4-х знаков на почту</span>
        </div>
        <div class="forget-password__input">
            <input-custom
                title="Email"
                placeholder="name@example.com"
            />
        </div>
        <div class="forget-password__input">
            <input-custom
                title="Код из 4-х знаков"
                placeholder="1234"
            />
        </div>
        <div class="forget-password__button">
            <button-custom
                class="big-h"
                value="Войти"
            />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss">
.forget-password{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 32px;
    &__info{
        width: 548px;
        .subtitle{
            margin-top: 12px;
            color: var(--text-gray-dark)
        }
    }
    &__button{
        button{
            width: 384px;
        }
    }
}
</style>
