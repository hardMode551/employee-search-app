<template>
  <div v-if="!currentUser" class="select-user-message">
    <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
  </div>
  <div v-else class="user">
    <img class="user-image" src="../assets/UserImage.svg" alt="image" />
    <div class="user-info">
      <h1 class="user-name">{{ currentUser?.name }}</h1>
      <p class="user-email">
        Email: <b class="grey-text">{{ currentUser?.email }}</b>
      </p>
      <p class="user-phone">
        Phone: <b class="grey-text">{{ currentUser?.phone }}</b>
      </p>
      <div class="user-description">
        <h1 class="user-description-title">О сотруднике:</h1>
        <p class="user-description-text grey-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.currentUser);

    return {
      currentUser,
    };
  },
});
</script>

<style>
@import '../style/ResultBlock.scss';
</style>
