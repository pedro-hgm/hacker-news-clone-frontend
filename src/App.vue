<template>
  <v-app>
    <div>
      <v-app-bar color="#ff6600" flat app>
        <v-toolbar-items class="mt-2 mr-2">
          <v-img src="./assets/logo.png" height="55" width="36"></v-img>
        </v-toolbar-items>
        <v-toolbar-title>
          <a href="/" class="page-title">
            <span class="headline font-weight-bold">Hacker News</span>
          </a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>

    <v-content class="grey lighten-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
.page-title {
  text-decoration: none;
  color: black;
}
</style>

