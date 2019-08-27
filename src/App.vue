<template>
  <v-app>
    <div>
      <v-app-bar color="orange darken-3" flat app>
        <v-toolbar-title class="headline text-uppercase">
          <span class="font-weight-bold">Hacker News</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    //
  },
  data: () => ({
    //
  })
};
</script>
