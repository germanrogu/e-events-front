<template>
  <Layout v-slot="{searchText}">
    <v-tabs v-model="tab" grow>
      <v-tab>All Events</v-tab>
      <v-tab>Live Music</v-tab>
      <v-tab>Coding Events</v-tab>
    </v-tabs>

    <v-row v-if="events" cols="12" sm="4" class="justify-space-around">
      <v-card
        v-for="edge in getEvents(searchText)"
        :key="edge.node.id"
        width="300"
        class="mt-5"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`http://localhost:1337${edge.node.image}`"
        />

        <v-card-title>
          {{ edge.node.title }}
        </v-card-title>

        <v-card-subtitle class="pb-0">
          {{ formatDate(edge.node.date) }}
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ edge.node.description }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            @click="$router.push(`/events/${edge.node.id}`)"
            color="orange"
            text
          >
            More Info
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </Layout>
</template>


<page-query>
 query{
  events: allEvent{
    edges{
      node{
        id
        title
        description
        duration
        date
        image
        category
      }
    }
  }
}
</page-query>

<script>
import moment from "moment";

export default {
  metaInfo: {
    title: "Hello, world!",
  },
  data() {
    return {
      tab: 0,
      events: [],
    };
  },
  mounted() {
    this.events = this.$page.events.edges;
  },
  watch: {
    tab(val) {
      if (this.tab === 0) {
        this.showAllEvents();
      } else {
        this.showEventsByType(val);
      }
    },
  },
  methods: {
    showAllEvents() {
      this.events = this.$page.events.edges;
    },
    showEventsByType(val) {
      this.events = this.$page.events.edges.filter((edge) => {
        return edge.node.category === val;
      });
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm a");
    },
    getEvents(searchText){
      return this.events.filter((edge) => {
        return edge.node.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  },
};
</script>

<style>

</style>
