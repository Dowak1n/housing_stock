<template>
  <div
      class="employee-card"
      :class="{ 'employee-card-selected': isSelected }"
      @click="selectUser(user)"
  >
    <img class="employee-card-image" alt="not found" src="/src/assets/notFountImage.png"/>
    <div class="employee-card-text">
      <span class="employee-card-text-name">{{ user.username }}</span>
      <p class="employee-card-text-mail">{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    isSelected() {
      return this.user === this.$store.state.selectedUser;
    },
  },
  methods: {
    selectUser(user) {
      this.$store.commit('setSelectedUser', user);
    },
  },
};
</script>

  <style scoped>
      .employee-card {
        border: 1px solid #ffffff;
        min-width: 240px;
        min-height: 70px;
        border-radius: 10px;
        background: #FFFFFF;
        box-shadow: 0 0 10px 0 #0000001A;
        display: flex;
        margin-bottom: 18px;

        .employee-card-image {
          height: 70px;
          width: 70px;
          border-radius: 10px 0 0 10px ;
        }
        .employee-card-text {
          padding: 12px 0 0 15px;
          width: 100%;
          border-radius: 0 9px 9px 0;
          .employee-card-text-name {
            font-family: Montserrat,serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 17px;
          }
          .employee-card-text-mail {
            font-family: Montserrat,serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 17px;
            text-align: left;
          }
        }
      }
      .employee-card-selected {
        border: 1px solid #E0E0E0;
        .employee-card-text {
          background: #E0E0E0;
          .employee-card-text-name {
            margin-left: 12px;
          }
        }
      }
  </style>