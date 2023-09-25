<template>
  <div class="employee-search">
    <h2 class="search-heading">Жилфонд</h2>
    <div class="search-window">
      <div class="search-window-left">
        <label class="search-window-text" for="searchInput">Поиск сотрудников</label>
        <input
            class="search-window-left-input"
            id="searchInput"
            type="text"
            v-model="searchTerm"
            @input="searchUsers"
            placeholder="Введите Id или имя"
        />

        <div class="search-window-results">
          <p class="search-window-text">Результаты</p>
          <div v-if="users.length > 0">
            <EmployeeCard
                v-for="user in users"
                :key="user.id"
                :user="user"
                @click="setSelectedUser(user)"
                :class="{ 'employee-card-selected': isSelected(user) }"
            ></EmployeeCard>
          </div>
          <div v-else>
            <p class="search-window-result-message">начните поиск</p>
          </div>
          <div v-if="loading" class="search-window-result-message">
            Загрузка данных...
          </div>
        </div>
      </div>
      <div class="search-window-right">
        <div class="search-window-user-info-container" v-if="selectedUser">
          <div class="search-window-user-info">
            <span class="name">{{ selectedUser.name }}</span>
            <span class="email"><strong class="bold">email: </strong> {{ selectedUser.email }}</span>
            <span class="phone"><strong class="bold">phone: </strong> {{ selectedUser.phone }}</span>
            <span class="about">О себе:</span>
            <p class="about-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div class="search-window-error-container" v-else>
          <p class="search-window-error-text">Выберите сотрудника, чтобы посмотреть его профиль</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EmployeeCard from "@/components/EmployeeCard.vue";
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchTerm = ref('');

const searchUsers = async () => {
  store.commit('setSearchTerm', searchTerm.value);
  try {
    await store.dispatch('searchUsers');
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
};

const users = computed(() => store.state.users);
const selectedUser = computed(() => store.state.selectedUser);
const loading = computed(() => store.state.loading);

const setSelectedUser = (user) => {
  store.commit('setSelectedUser', user);
};

const isSelected = (user) => {
  return user === selectedUser.value;
};
</script>

<style scoped>
.employee-search {
  display: flex;
  flex-direction: column;
}

.search-heading {
  color: #E31F24;
  font-size: 32px;
  font-family: Montserrat, serif;
  font-weight: 700;
  margin-bottom: 30px;
}

.search-window {
  display: flex;
  min-width: 876px;
  min-height: 505px;
  box-shadow: 0 0 10px 0 #0000001A;
  border-radius: 10px;

  .search-window-left {
    display: flex;
    flex-direction: column;
    padding: 27px 32px 0 20px;
    border-right: 1px solid #E0E0E0;
    font-family: Montserrat, serif;

    .search-window-text {
      color: #333333;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 24px;
    }

    .search-window-left-input {
      padding: 16px;
      border-radius: 8px;
      width: 240px;
      height: 46px;
      outline: none;
      border: 1.5px solid #E9ECEF;
      color: #E31F24;
      font-size: 14px;
      font-family: Montserrat, serif;
      font-weight: 400;
      margin-bottom: 24px;
    }

    .search-window-results {
      .search-window-result-message {
        font-size: 14px;
        font-weight: 400;
        color: #76787D;
      }
    }
  }

  .search-window-right {
    width: 100%;

    .search-window-user-info-container {
      display: flex;
      padding: 30px 30px 0 30px;
    }

    .search-window-error-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .search-window-error-text {
        font-family: Montserrat, serif;
        font-size: 14px;
        font-weight: 400;
        color: #76787D;
      }
    }

    .search-window-user-picture {
      min-width: 424px;
      min-height: 286px;
      border: 1px solid #E0E0E0;
      margin-right: 62px;
    }

    .search-window-user-info {
      display: flex;
      flex-direction: column;
      font-family: Montserrat, serif;

      .bold {
        font-size: 16px;
        font-weight: 600;
        color: black;
      }

      .name {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        margin-bottom: 10px;
      }

      .email {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 10px;
        color: #76787D;
      }

      .phone {
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 20px;
        color: #76787D;
      }

      .about {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 25px;
      }

      .about-text {
        max-width: 439px;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        color: #76787D;
      }
    }
  }
}

.employee-card-selected {
  border: 1px solid #E0E0E0;
}
</style>
