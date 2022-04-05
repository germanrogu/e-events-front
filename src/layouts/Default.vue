<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title> E-events </v-toolbar-title>
      <v-text-field
        class="ml-8"
        style="max-width: 300px"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        outlined
        rounded
        dense
        hide-details
      />

      <v-spacer />
      <v-btn>Create event</v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName,
    siteDescription
  }
}
</static-query>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
