<template>
  <div class="search-bar">
    <h3 class="search-bar-title">Поиск сотрудников</h3>
    <input
      class="search-bar-input"
      v-model="searchInput"
      @input="handleInput"
      placeholder="Введите Id или имя"
    />

    <div v-if="error">{{ error }}</div>
    <h3 class="search-bar-title">Результаты</h3>
    <div class="search-info" v-if="searchInput === ''">
      <p>начните поиск</p>
    </div>
    <div v-else-if="users.length > 0">
      <div v-for="user in users" :key="user.id" class="result-user" @click="selectUser(user)">
        <img class="result-image" src="../assets/UserImage.svg" alt="image" />
        <div class="result-info" :class="{ selected: user === userSelected }">
          <!-- <p v-if="loading">Загрузка профилей...</p> -->
          <p class="result-name">{{ user.name }}</p>
          <p class="result-email">{{ user.email }}</p>
        </div>
      </div>
    </div>
    <p v-else-if="searchInput && !loading" class="search-info">ничего не найдено</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, Ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { debounce } from 'lodash';

import { User } from './types';

export default defineComponent({
  setup() {
    const store = useStore();
    const searchInput = ref('');
    const users = computed(() => store.state.users);
    const currentUser = computed(() => store.state.currentUser);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const userSelected: Ref<User | null> = ref(null);

    // Функция для выполнения запроса при изменении значения searchInput с задержкой
    const debouncedSearchUsers = debounce(async (searchInput: string) => {
      if (searchInput === '') {
        store.commit('setUsers', []);
        error.value = null;
        return;
      }

      loading.value = true;
      error.value = null;

      const searchArray = searchInput.split(',').map((item) => item.trim());

      const isNumeric = /^\d+$/.test(searchArray[0]);

      try {
        const requests = searchArray.map((item) => {
          if (isNumeric) {
            return axios.get(`https://jsonplaceholder.typicode.com/users/${item}`);
          } else {
            return axios.get('https://jsonplaceholder.typicode.com/users', {
              params: { name_like: item },
            });
          }
        });

        const responses = await Promise.all(requests);
        const users = responses.map((response) => response.data);

        store.commit('setUsers', users.filter(Boolean));
      } catch (error: any) {
        store.commit('setUsers', []);
        error.value = error.message;
      } finally {
        loading.value = false;
      }
    }, 500);

    // Функция для выбора сотрудника и отображения его полной информации
    const selectUser = (user: User) => {
      if (userSelected.value === user) {
        store.commit('setCurrentUser', null);
        userSelected.value = null;
      } else {
        store.commit('setCurrentUser', user);
        userSelected.value = user;
      }
    };

    // Отслеживание изменений в searchInput и выполнение поиска с задержкой
    watch(searchInput, () => {
      const names = searchInput.value.split(',').map((name) => name.trim());
      debouncedSearchUsers(names.join(','));
    });

    // Функция для обработки ввода и удаления лишних запятых
    const handleInput = () => {
      const cleanedInput = searchInput.value.replace(/,+/g, ',');
      if (cleanedInput !== searchInput.value) {
        searchInput.value = cleanedInput;
      }
    };

    return {
      searchInput,
      users,
      loading,
      error,
      handleInput,
      selectUser,
      userSelected,
      currentUser,
    };
  },
});
</script>

<style>
@import '../style/UserProfile.scss';
</style>
